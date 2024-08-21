import axios from "axios";

const api = axios.create({
  baseURL: "https://api.questio.co.kr/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // localStorage에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 요청 헤더에 토큰 추가
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

    // 토큰이 만료된 경우 (401)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await api.post("/auth/refresh", { token: refreshToken });

          if (response.status === 200) {
            const newToken = response.data.token;
            localStorage.setItem("token", newToken);

            // 새로운 토큰으로 원래 요청 헤더 업데이트
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            // 새로운 토큰으로 원래 요청 재시도
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        // 여기서 리프레시 토큰 갱신 실패 시 처리
        console.error("토큰 갱신 중 오류 발생:", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;