import React, { useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #374151;
  border-radius: 10px;
  background-color: #2d3748;
  font-size: 16px;
  color: white;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3c4960;
    background-color: #374151;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 20px;
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

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => (
  <InputContainer>
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </InputContainer>
);

const FindPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email Input, 2: Code Input, 3: Password Input
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password: string) => {
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordPattern.test(password);
  };

  const handleButtonClick = async () => {
    if (step === 1) {
      // Validate email
      if (!email.trim()) {
        toast.error("이메일을 입력해주세요.");
        return;
      }
      if (!isValidEmail(email)) {
        toast.error("유효한 이메일을 입력해주세요.");
        return;
      }

      // Send verification code
      setLoading(true);
      try {
        // Assume an API call to send the code
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API call
        toast.success("인증 코드가 전송되었습니다.");
        setStep(2);
      } catch (error) {
        toast.error("코드 전송 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    } else if (step === 2) {
      // Verify the code
      if (!code.trim()) {
        toast.error("인증번호를 입력해주세요.");
        return;
      }
      setLoading(true);
      try {
        // Assume an API call to verify the code
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API call
        toast.success("인증되었습니다.");
        setStep(3);
      } catch (error) {
        toast.error("코드 인증 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    } else if (step === 3) {
      // Validate passwords
      if (!newPassword.trim() || !checkPassword.trim()) {
        toast.error("비밀번호를 입력해주세요.");
        return;
      }
      if (!isValidPassword(newPassword)) {
        toast.error("비밀번호는 8~20자, 영어와 숫자가 포함되어야 합니다.");
        return;
      }
      if (newPassword !== checkPassword) {
        toast.error("비밀번호가 일치하지 않습니다.");
        return;
      }

      // Reset the password
      setLoading(true);
      try {
        // Assume an API call to reset the password
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API call
        toast.success("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/login");
      } catch (error) {
        toast.error("비밀번호 변경 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FormContainer>
      <h2 style={{ color: "#ffffff", marginBottom: "20px" }}>비밀번호 찾기</h2>
      {step === 1 && (
        <InputField
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
      {step === 2 && (
        <InputField
          type="text"
          placeholder="인증번호를 입력해주세요"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      )}
      {step === 3 && (
        <>
          <InputField
            type="password"
            placeholder="새 비밀번호를 입력해주세요"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="비밀번호를 재입력해주세요"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        </>
      )}
      <ButtonContainer>
        <Button onClick={handleButtonClick} disabled={loading}>
          {loading ? (
            <Spinner />
          ) : step === 1 ? (
            "이메일 보내기"
          ) : step === 2 ? (
            "인증하기"
          ) : (
            "비밀번호 변경"
          )}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

const FindPW: React.FC = () => {
  return (
    <Container>
      <Header />
      <FindPassword />
    </Container>
  );
};

export default FindPW;
