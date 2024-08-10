import React, { useState } from "react";
import Header from "./Header";

import { useNavigate } from "react-router-dom";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/login");
  };

  const sendAuthEmail = () => {
    /* 인증 이메일 보내기 */
    alert("이메일로 인증 메일 발송하였습니다.");
  };

  const checkAuthCode = () => {
    /* 인증 번호 확인 */
    alert("확인되었습니다.");
  };

  return (
    <div className="form-container">
      <h2>회원가입</h2>
      <InputField
        type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
          <input type="checkbox" />
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
