import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";

// 개발 환경 여부를 확인하는 변수
const isDevelopment = process.env.NODE_ENV === "development";

const mockResponse: AxiosResponse<any> = {
  data: { message: "더미 데이터" },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {
    headers: new AxiosHeaders()
  },
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
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
              token: refreshToken,
            });
            if (response.status === 200) {
              const newToken = response.data.token;
              localStorage.setItem("token", newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return api(originalRequest);
            }
          }
        } catch (refreshError) {
          console.error("토큰 갱신 중 오류 발생:", refreshError);
          localStorage.removeItem("token");
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
    return Promise.resolve(mockResponse as R);
  };

  api.post = async <T = any, R = AxiosResponse<T>>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log(`Mock POST request to: ${url} with data:`, data);
    return Promise.resolve(mockResponse as R);
  };

  api.put = async <T = any, R = AxiosResponse<T>>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log(`Mock PUT request to: ${url} with data:`, data);
    return Promise.resolve(mockResponse as R);
  };

  api.delete = async <T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log(`Mock DELETE request to: ${url}`);
    return Promise.resolve(mockResponse as R);
  };
}

export default api;
