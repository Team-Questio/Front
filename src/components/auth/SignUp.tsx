import React, { useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAxiosError } from "axios";

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

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid ${({ hasError }) => (hasError ? "#FF6B6B" : "#374151")};
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

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 10px;
`;

const CheckboxContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
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
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
}) => (
  <InputContainer>
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      hasError={!!errorMessage}
    />
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </InputContainer>
);

const SignUpBox: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [isAuthCheck, setIsAuthCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >(undefined);

  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password: string) => {
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordPattern.test(password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(
      isValidEmail(e.target.value) ? undefined : "유효한 이메일을 입력해주세요."
    );
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(
      isValidPassword(e.target.value)
        ? undefined
        : "비밀번호는 8~20자, 영어와 숫자가 포함되어야 합니다."
    );
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(
      e.target.value === password ? undefined : "비밀번호가 일치하지 않습니다."
    );
  };

  const handleButtonClick = async () => {
    if (!isEmailSend) {
      if (emailError) {
        toast.error("유효한 이메일을 입력해주세요.");
        return;
      }

      setLoading(true);

      try {
        await api.post("/auth/email-auth", JSON.stringify({ email }));
        toast.success("이메일로 인증 메일을 발송하였습니다.");
        setIsEmailSend(true);
      } catch (error) {
        console.error(error);
        toast.error("이메일 발송에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    } else if (!isAuthCheck) {
      if (!authCode) {
        toast.error("인증번호를 입력해주세요.");
        return;
      }

      setLoading(true);

      const params = new URLSearchParams();
      params.append("code", authCode);

      try {
        await api.post("/auth/email-auth/verify", JSON.stringify({ email }), {
          params: params,
        });
        toast.success("인증되었습니다.");
        setIsAuthCheck(true);
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
          if (error.response?.data.status === "A003") {
            toast.error("인증 코드가 만료되었거나 존재하지 않습니다");
          } else if (error.response?.data.status === "A004") {
            toast.error("인증 코드가 일치하지 않습니다. 인증코드가 폐기됩니다");
          }
        }
      } finally {
        setLoading(false);
      }
    } else {
      if (passwordError || confirmPasswordError) {
        toast.error("비밀번호를 확인해주세요.");
        return;
      }

      if (!isChecked) {
        toast.error("개인정보처리방침 확인이 필요합니다.");
        return;
      }

      setLoading(true);

      try {
        await api.post("/users", JSON.stringify({ username: email, password }));
        toast.success("회원가입이 완료되었습니다.");
        navigate("/login");
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
          if (error.code === "A009") {
            toast.error("이미 가입된 이메일입니다");
          }
          if (error.code === "A006") {
            toast.error("회원가입 시 제출된 이메일이 인증되지 않았습니다.");
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FormContainer>
      <h2 style={{ color: "#ffffff", marginBottom: "20px", cursor: "default" }}>
        회원가입
      </h2>
      <InputField
        type="text"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={handleEmailChange}
        errorMessage={emailError}
      />
      {isEmailSend && (
        <InputField
          type="text"
          placeholder="인증번호를 입력해주세요"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
        />
      )}
      {isAuthCheck && (
        <>
          <InputField
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={handlePasswordChange}
            errorMessage={passwordError}
          />
          <InputField
            type="password"
            placeholder="비밀번호를 재입력해주세요"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            errorMessage={confirmPasswordError}
          />
          {/* <CheckboxContainer>
            <Label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                disabled={loading}
              />
              개인정보처리방침 동의
            </Label>
          </CheckboxContainer> */}
        </>
      )}
      <ButtonContainer>
        <Button onClick={handleButtonClick} disabled={loading}>
          {loading ? (
            <Spinner />
          ) : !isEmailSend ? (
            "이메일 보내기"
          ) : !isAuthCheck ? (
            "인증하기"
          ) : (
            "회원가입"
          )}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

const SignUp: React.FC = () => {
  return (
    <Container>
      <Header />
      <SignUpBox />
    </Container>
  );
};

export default SignUp;
