import React, { useState } from "react";
import Header from "./Header";

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

const FindPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleFindPassword = () => {
    // 비밀번호 찾기 로직
    console.log("비밀번호 찾기 시도:", email, code);
  };

  const handleSendCode = () => {
    // 인증 코드 전송 로직
    console.log("인증 코드 전송:", email);
  };

  return (
    <div className="form-container">
      <h2>비밀번호 찾기</h2>
      <InputField
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="button-container">
        <button className="form-button" onClick={handleSendCode}>
          인증하기
        </button>
      </div>
      <InputField
        type="text"
        placeholder="인증번호를 입력해주세요"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="button-container">
        <button className="form-button" onClick={handleFindPassword}>
          확인하기
        </button>
      </div>
    </div>
  );
};

const FindPW: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Header toggleDarkMode={toggleDarkMode} />
      <div className="wrapper">
        <FindPassword />
      </div>
    </div>
  );
};

export default FindPW;
