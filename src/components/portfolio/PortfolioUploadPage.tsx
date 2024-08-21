import React, { useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
import "react-toastify/dist/ReactToastify.css";

// Styled Components
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
  color: #ffffff;
`;

const Description = styled.p`
  margin: 10pt 0 40pt 0;
  font-size: 18px;
  line-height: 1.5;
  color: #ffffff;
`;

const InputBackBox = styled.div`
  background-color: #1f2937;
  border: none;
  border-radius: 12px;
  width: 50%;
  padding: 10pt;
`;

const TextArea = styled.textarea`
  padding: 10pt;
  font-size: 16px;
  background-color: #2d3748;
  color: #ffffff;
  border: 1px dashed #ffffff;
  border-radius: 12px;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  resize: none;
`;

const SubmitButton = styled.button`
  padding: 10pt;
  font-size: 18px;
  background-color: #374151;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 10pt;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d3748;
  }

  &:disabled {
    background-color: #6b7280;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffffff;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PortfolioUploadPageText: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleButtonClick = async () => {
    if (!content.trim()) {
      toast.error("포트폴리오 내용을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/portfolio",
        JSON.stringify({ content })
      );

      console.log("Response:", response.data);

      toast.success("포트폴리오가 성공적으로 업로드되었습니다!");
      setLoading(false);
      setTimeout(() => {
        navigate("/question-list");
      }, 2000);
    } catch (error) {
      toast.error("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header />
      <Content>
        <Title>포트폴리오를 올려봐요</Title>
        <Description>포트폴리오 정보를 입력하고 맞춤형 질문을 받아보세요</Description>
        <InputBackBox>
          <TextArea
            placeholder="Enter your portfolio details here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />
          <SubmitButton onClick={handleButtonClick} disabled={loading}>
            {loading ? <Spinner /> : "업로드"}
          </SubmitButton>
        </InputBackBox>
      </Content>
    </Container>
  );
};

export default PortfolioUploadPageText;