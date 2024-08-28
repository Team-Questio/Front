import React from "react";
import styled from "styled-components";
import api from "../../utils/api";

const Icon = styled.img`
  margin-top: 20px;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const Div = styled.div`
  cursor: pointer;
`;

interface AuthLoginIconProps {
  imgSrc: string;
  AuthUrl: string;
}

const AuthLoginIcon: React.FC<AuthLoginIconProps> = ({ imgSrc, AuthUrl }) => {
  const loginHandler = async () => {
    window.location.href = AuthUrl;
  };

  return (
    <Div onClick={loginHandler}>
      <Icon src={imgSrc} />
    </Div>
  );
};

export default AuthLoginIcon;
