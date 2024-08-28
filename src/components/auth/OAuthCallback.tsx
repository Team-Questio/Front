import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/portfolio");
    } else {
      toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
      navigate("/login");
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default OAuthCallback;
