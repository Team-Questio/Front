import React, { useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
import "react-toastify/dist/ReactToastify.css";

// Styled Components
const Container = styled.div`
  background-color: #101827;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const FormContainer = styled.div`
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  background-color: #1f2937;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  color: #ffffff;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #374151;
  border-radius: 10px;
  background-color: #2d3748;
  font-size: 16px;
  color: white;
  box-sizing: border-box;
  height: 200px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #3c4960;
    background-color: #374151;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #374151;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d3748;
  }

  &:disabled {
    background-color: #2d3748;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffffff;
  width: 24px;
  height: 24px;
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
      <FormContainer>
        <Title>포트폴리오를 올려봐요</Title>
        <TextArea
          placeholder="Enter your portfolio details here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        <Button onClick={handleButtonClick} disabled={loading}>
          {loading ? <Spinner /> : "업로드"}
        </Button>
      </FormContainer>
    </Container>
  );
};

export default PortfolioUploadPageText;
