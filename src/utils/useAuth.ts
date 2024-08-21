import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "./api"; // axios 인스턴스

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as { exp: number };
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          // 토큰이 만료된 경우, refreshToken으로 새 accessToken을 요청
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            api
              .post("/auth/refresh", { token: refreshToken })
              .then((response) => {
                localStorage.setItem("accessToken", response.data.accessToken);
                api.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${response.data.accessToken}`;
                setIsAuthenticated(true);
              })
              .catch(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate("/login");
              });
          } else {
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("토큰 디코딩 중 오류 발생:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    setIsLoading(false);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return { isAuthenticated, isLoading, logout };
};

export default useAuth;
