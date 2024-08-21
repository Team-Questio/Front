import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "./api";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as { exp: number };
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          // 토큰이 유효할 때만 navigate 호출
          setIsAuthenticated(true);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          if (window.location.pathname === "/login") {
            navigate("/portfolio-upload-text"); // 로그인 페이지에 있을 때만 리디렉션
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
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  return { isAuthenticated, isLoading, logout };
};

export default useAuth;
