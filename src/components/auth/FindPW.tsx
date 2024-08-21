import React, { useState } from "react";
import Header from "../shared/Header";
import "../../styles/style.css";

import { useNavigate } from "react-router-dom";

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
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();

  const handleFindPassword = () => {
    navigate("/login");
  };

  const handleSendCode = () => {
    alert("인증 코드가 전송되었어요");
  };
  const handleCheckCode = () => {
    alert("인증되었어요");
  };

  return (
    <div className="form-container">
      <h2>비밀번호 찾기</h2>
      <div className="flex-form">
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
      </div>
      <div className="flex-form">
        <InputField
          type="text"
          placeholder="인증번호를 입력해주세요"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="button-container">
          <button className="form-button" onClick={handleCheckCode}>
            확인하기
          </button>
        </div>
      </div>
      <InputField
        type="text"
        placeholder="새 비밀번호를 입력해주세요"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <InputField
        type="text"
        placeholder="비밀번호를 재입력해주세요"
        value={checkPassword}
        onChange={(e) => setCheckPassword(e.target.value)}
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
  return (
    <div className={"light"}>
      <Header />
      <div className="wrapper">
        <FindPassword />
      </div>
    </div>
  );
};

export default FindPW;
