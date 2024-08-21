import React from "react";
import styled from "styled-components";
import Header from "./shared/Header";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: #1f2937;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #101827;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
`;

const Title = styled.h1`
  margin: 10pt 0;
  font-size: 36px;
`;

const Description = styled.p`
  margin: 10pt 0 40pt 0;
  font-size: 18px;
  line-height: 1.5;
`;

const StartButton = styled.button`
  margin: 30pt 0;
  padding: 10pt 20pt;
  font-size: 18px;
  background-color: #1f2937;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d3748;
  }
`;

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
  };

  return (
    <Container>
      <Header />
      <Content>
        <Title>Questio와 면접을 준비해봐요</Title>
        <Description>
          포트폴리오를 분석해서 면접을 도와드릴게요
          <br />
          당신의 잠재력을 일깨워드릴게요
        </Description>
        <StartButton onClick={handleButtonClick}>시작해보기</StartButton>
      </Content>
    </Container>
  );
};

export default App;
