import React, { useState } from "react";
import Header from "./Header";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../styles/style.css";

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
  <div className="input-container">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SignUpBox: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [isAuthCheck, setIsAuthCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const sendAuthEmail = async () => {
    if (!isValidEmail(email)) {
      alert("유효한 이메일을 입력해주세요");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.questio.co.kr/api/v1/auth/email-auth",
        { email }
      );
      console.log("Response:", response.data);
      alert("이메일로 인증 메일을 발송하였습니다.");
      setIsEmailSend(true);
    } catch (error) {
      console.error(error);
      alert("이메일 발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const checkAuthCode = async () => {
    try {
      const response = await axios.post(
        "https://api.questio.co.kr/api/v1/auth/email-auth/verify",
        { email },
        {
          params: { code: authCode },
        }
      );
      console.log("Response:", response.data);
      alert("인증되었습니다.");
      setIsAuthCheck(true);
    } catch (error) {
      console.error(error);
      alert("인증번호를 다시 확인해주세요.");
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleSignUp = async () => {
    if (!isEmailSend || !isAuthCheck) {
      alert("이메일 인증이 필요합니다.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 다릅니다.");
      return;
    }
    if (!isChecked) {
      alert("개인정보처리방침 확인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.questio.co.kr/api/v1/users",
        { username: email, password }
      );
      console.log("Response:", response.data);
      alert("회원가입이 완료되었습니다.");
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="form-container">
      <h2>회원가입</h2>
      <div className="flex-form">
        <InputField
          type="text"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="button-container">
          <button className="form-button" onClick={sendAuthEmail}>
            인증하기
          </button>
        </div>
      </div>
      {isEmailSend && (
        <div className="flex-form">
          <InputField
            type="text"
            placeholder="인증번호를 입력해주세요"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
          />
          <div className="button-container">
            <button className="form-button" onClick={checkAuthCode}>
              확인하기
            </button>
          </div>
        </div>
      )}

      <InputField
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="비밀번호를 재입력해주세요"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          개인정보처리방침 동의
        </label>
      </div>
      <div className="button-container">
        <button className="form-button" onClick={handleSignUp}>
          회원가입
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
    </div>
  );
};

export default SignUp;
