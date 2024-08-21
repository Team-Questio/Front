import React from "react";
import styled from "styled-components";

const KakaoLogo = styled.img`
  margin-top: 20px;
  width: 45px;
  height: 45px;
  cursor: pointer;
`;

const KakaoLogin: React.FC = () => {
  const restApiKey: string | undefined = process.env.REACT_APP_REST_API_KEY;
  const redirectUrl: string | undefined =
    process.env.REACT_APP_KAKAO_REDIRECT_URL;

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`;

  const loginHandler = () => {
    window.location.href = kakaoAuthUrl;
  };

  return (
    <KakaoLogo src="/img/kakaoLogo.png" alt="kakao" onClick={loginHandler} />
  );
};

export default KakaoLogin;
