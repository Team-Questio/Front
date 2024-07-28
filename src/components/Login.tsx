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

const LoginBox: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/portfolio-upload-text");
  };

  const handleFindPWButtonClick = () => {
    navigate("/find-password");
  };

  const handleSignUpButtonClick = () => {
    navigate("/signup");
  };

  return (
    <div className="form-container">
      <h2>로그인</h2>
      <InputField
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-sub-item">
        <label>
          <input type="checkbox" />
          로그인 유지
        </label>
        <div className="login-sub-item-sub">
          <div onClick={handleSignUpButtonClick}>회원가입</div>
          <div className="bin-divide" />
          <div onClick={handleFindPWButtonClick}>비밀번호 찾기</div>
        </div>
      </div>
      <button className="form-button" onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
};

const Login: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Header toggleDarkMode={toggleDarkMode} />
      <div className="wrapper">
        <LoginBox />
      </div>
    </div>
  );
};

export default Login;
