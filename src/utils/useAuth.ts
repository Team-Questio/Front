import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "./api";

// 개발 환경 여부를 확인하는 변수
const isDevelopment = process.env.NODE_ENV === "development";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDevelopment) {
      // 개발 환경에서는 강제로 인증된 상태로 설정
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token) as { exp: number };
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp > currentTime) {
            setIsAuthenticated(true);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            if (window.location.pathname === "/login") {
              navigate("/portfolio-upload-text");
            }
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            navigate("/login");
          }
        } catch (error) {
          console.error("토큰 디코딩 중 오류 발생:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        }
      }
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = () => {
    if (!isDevelopment) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
    setIsAuthenticated(false);
    navigate("/");
  };

  return { isAuthenticated, isLoading, logout };
};

export default useAuth;