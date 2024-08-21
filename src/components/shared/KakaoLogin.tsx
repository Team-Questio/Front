import React from "react";
import "../../styles/style.css";

const KakaoLogin: React.FC = () => {
  const restApiKey: string | undefined = process.env.REACT_APP_REST_API_KEY;
  const redirectUrl: string | undefined =
    process.env.REACT_APP_KAKAO_REDIRECT_URL;

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`;

  const loginHandler = () => {
    window.location.href = kakaoAuthUrl;
  };

  return (
    <>
      <img
        src="/img/kakaoLogo.png"
        alt="kakao"
        className="kakao-logo"
        onClick={loginHandler}
      />
    </>
  );
};

export default KakaoLogin;
