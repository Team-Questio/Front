import React from "react";
import styled from "styled-components";
import api from "../../utils/api";

const KakaoLogo = styled.img`
  margin-top: 20px;
  width: 45px;
  height: 45px;
  cursor: pointer;
`;

const KakaoDiv = styled.div`
  cursor: pointer;
`;

const KakaoLogin: React.FC = () => {
  const kakaoAuthUrl = `https://api.questio.co.kr/api/v1/auth/oauth/kakao`;

  const loginHandler = async () => {
    window.location.href = kakaoAuthUrl;
  };

  return (
    <KakaoDiv onClick={loginHandler}>
      <KakaoLogo src="/img/kakaoLogo.png" alt="kakao" />
    </KakaoDiv>
  );
};

export default KakaoLogin;
