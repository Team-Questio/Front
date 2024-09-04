import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";

// 개발 환경 여부를 확인하는 변수
const isDevelopment = process.env.NODE_ENV === "development";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// 요청 유형과 URL에 따른 더미 응답 생성 함수
const mockResponse = (
  method: string,
  url: string,
  data?: any
): AxiosResponse<any> => {
  if (method === "get") {
    switch (url) {
      case "/portfolio":
        return {
          data: [
            {
              portfolio: {
                portfolioId: 1,
                content: "포트폴리오 내용 1\n asdfasdfasd",
              },
              quests: [
                {
                  questId: 1,
                  question: "첫 번째 질문?",
                },
                {
                  questId: 2,
                  question: "두 번째 질문?",
                },
              ],
            },
            {
              portfolio: {
                portfolioId: 1,
                content: "포트폴리오 내용 2\n ㅋㅋㅋs",
              },
              quests: [
                {
                  questId: 1,
                  question: "첫 번째 질문?",
                },
                {
                  questId: 2,
                  question: "두 번째 질문?",
                },
              ],
            },
          ],
          status: 200,
          statusText: "OK",
          headers: {},
          config: { headers: new AxiosHeaders() },
        };
      default:
        return {
          data: { message: "GET 더미 데이터" },
          status: 200,
          statusText: "OK",
          headers: {},
          config: { headers: new AxiosHeaders() },
        };
    }
  } else if (method === "post") {
    switch (url) {
      case "/portfolio":
        if (data && data.content === "error") {
          return {
            data: { message: "업로드 제한에 걸렸습니다." },
            status: 403,
            statusText: "Forbidden",
            headers: {},
            config: { headers: new AxiosHeaders() },
          };
        }
        return {
          data: {
            portfolioId: 0,
            remaining: 0,
          },
          status: 200,
          statusText: "OK",
          headers: {},
          config: { headers: new AxiosHeaders() },
        };
      case "/auth/refresh":
        return {
          data: { token: "newDummyToken" },
          status: 200,
          statusText: "OK",
          headers: {},
          config: { headers: new AxiosHeaders() },
        };
      default:
        return {
          data: { message: "POST 더미 데이터" },
          status: 200,
          statusText: "OK",
          headers: {},
          config: { headers: new AxiosHeaders() },
        };
    }
  } else if (method === "patch") {
    switch (url) {
      default:
        return {
          data: { message: "POST 더미 데이터" },
          status: 200,
          statusText: "OK",
          headers: {},
          config: { headers: new AxiosHeaders() },
        };
    }
  }

  return {
    data: { message: "더미 데이터" },
    status: 200,
    statusText: "OK",
    headers: {},
    config: { headers: new AxiosHeaders() },
  };
};

const api = axios.create({
  baseURL: "https://api.questio.co.kr/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

if (!isDevelopment) {
  // 요청 인터셉터 추가
  api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 추가 - 토큰 갱신 로직 포함
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const response = await api.post("/auth/refresh", {
              refreshToken: refreshToken,
            });
            if (response.status === 200) {
              const newAccessToken = response.data.accessToken;
              localStorage.setItem("accessToken", newAccessToken);
              const newRefreshToken = response.data.refreshToken;
              localStorage.setItem("refreshToken", newRefreshToken);
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return api(originalRequest);
            }
          }
        } catch (refreshError) {
          console.error("토큰 갱신 중 오류 발생:", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
} else {
  // 개발 환경에서는 더미 데이터 반환
  api.get = async <T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log(`Mock GET request to: ${url}`);
    return Promise.resolve(
      sleep(3000).then(() => mockResponse("get", url)) as R
    );
  };

  api.post = async <T = any, R = AxiosResponse<T>>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log(`Mock POST request to: ${url} with data:`, data);
    return Promise.resolve(
      sleep(3000).then(() => mockResponse("post", url, data)) as R
    );
  };

  api.put = async <T = any, R = AxiosResponse<T>>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log(`Mock PUT request to: ${url} with data:`, data);
    return Promise.resolve(
      sleep(3000).then(() => mockResponse("put", url, data)) as R
    );
  };

  api.delete = async <T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log(`Mock DELETE request to: ${url}`);
    return Promise.resolve(
      sleep(3000).then(() => mockResponse("delete", url)) as R
    );
  };

  api.patch = async <T = any, R = AxiosResponse<T>>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log(`Mock PATCH request to: ${url}`);
    return Promise.resolve(
      sleep(3000).then(() => mockResponse("patch", url)) as R
    );
  };
}

export default api;
