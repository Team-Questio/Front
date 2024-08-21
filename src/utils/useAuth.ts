import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api"; // axios 인스턴스
import { jwtDecode } from "jwt-decode"; // jwt-decode 임포트

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as { exp: number };
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true); // 토큰이 유효하다면 로그인 상태 유지
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // axios에 토큰 추가
        } else {
          localStorage.removeItem("token"); // 만료된 토큰 제거
        }
      } catch (error) {
        console.error("토큰 디코딩 중 오류 발생:", error);
        localStorage.removeItem("token"); // 오류 발생 시 토큰 제거
      }
    }
    setIsLoading(false); // 로딩 완료
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return { isAuthenticated, isLoading, logout };
};

export default useAuth;
