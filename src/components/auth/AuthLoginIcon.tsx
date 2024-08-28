import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../utils/api";

const isDevelopment = process.env.NODE_ENV === "development";

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
  const navigate = useNavigate();
  const loginHandler = async () => {
    if (!isDevelopment) {
      window.location.href = AuthUrl;
    } else {
      navigate("/portfolio");
    }
  };

  return (
    <Div onClick={loginHandler}>
      <Icon src={imgSrc} />
    </Div>
  );
};

export default AuthLoginIcon;
