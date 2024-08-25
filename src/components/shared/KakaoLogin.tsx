import React from "react";
import styled from "styled-components";
import api from "../../utils/api";

const KakaoLogo = styled.img`
  margin-top: 20px;
  width: 45px;
  height: 45px;
  cursor: pointer;
`;

const KakaoLogin: React.FC = () => {
  const kakaoAuthUrl = `https://questio.co.kr/api/v1/auth/oauth/kakao`;

  const loginHandler = async () => {
    console.log("clicked");
    const response = await api.get(kakaoAuthUrl);

    console.log(response);

    // window.location.href = kakaoAuthUrl;
  };

  return (
    <div onClick={loginHandler}>
      <KakaoLogo src="/img/kakaoLogo.png" alt="kakao" />
    </div>
  );
};

export default KakaoLogin;
