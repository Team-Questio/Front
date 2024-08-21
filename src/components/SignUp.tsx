import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/style.css";

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
  <div className="input-container">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={errorMessage ? "input-error" : ""}
    />
    {errorMessage && <div className="error-message">{errorMessage}</div>}
  </div>
);

const SignUpBox: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [isAuthCheck, setIsAuthCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
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
      // 이메일 전송 단계
      if (emailError) {
        toast.error("유효한 이메일을 입력해주세요.");
        return;
      }

      setLoading(true);

      try {
        const response = await axios.post(
          "https://api.questio.co.kr/api/v1/auth/email-auth",
          JSON.stringify({ email }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response.data);
        toast.success("이메일로 인증 메일을 발송하였습니다.");
        setIsEmailSend(true);
      } catch (error) {
        console.error(error);
        toast.error("이메일 발송에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    } else if (!isAuthCheck) {
      // 인증번호 확인 단계
      if (!authCode) {
        toast.error("인증번호를 입력해주세요.");
        return;
      }

      setLoading(true);

      try {
        const response = await axios.post(
          "https://api.questio.co.kr/api/v1/auth/email-auth/verify",
          JSON.stringify({ email }),
          {
            params: { code: authCode },
          }
        );
        console.log("Response:", response.data);
        toast.success("인증되었습니다.");
        setIsAuthCheck(true);
      } catch (error) {
        console.error(error);
        toast.error("인증번호를 다시 확인해주세요.");
      } finally {
        setLoading(false);
      }
    } else {
      // 회원가입 단계
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
        const response = await axios.post(
          "https://api.questio.co.kr/api/v1/users",
          JSON.stringify({ username: email, password })
        );
        console.log("Response:", response.data);
        toast.success("회원가입이 완료되었습니다.");
        navigate("/portfolio-upload-text");
      } catch (error) {
        console.error(error);
        toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>회원가입</h2>
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
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                disabled={loading}
              />
              개인정보처리방침 동의
            </label>
          </div>
        </>
      )}
      <div className="button-container">
        <button
          className="form-button"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading
            ? "처리 중..."
            : !isEmailSend
            ? "이메일 보내기"
            : !isAuthCheck
            ? "인증하기"
            : "회원가입"}
        </button>
      </div>
    </div>
  );
};

const SignUp: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Header toggleDarkMode={toggleDarkMode} />
      <div className="wrapper">
        <SignUpBox />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
