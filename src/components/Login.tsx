import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import KaKaoLogin from "./KaKaoLogin";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.questio.co.kr/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Content-Type을 JSON으로 설정
          },
        }
      );

      console.log("요청 결과:", response); // 토큰을 콘솔에 출력

      if (response.status === 200) {
        toast.success("로그인 성공!");
        navigate("/portfolio-upload-text");
      } else {
        toast.error("로그인 실패. 다시 시도하세요.");
      }
    } catch (error) {
      toast.error("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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
          <div onClick={handleSignUpButtonClick} className="signup-link">
            회원가입
          </div>
          <div className="bin-divide" />
          <div
            onClick={handleFindPWButtonClick}
            className="forgot-password-link"
          >
            비밀번호 찾기
          </div>
        </div>
      </div>
      <button className="form-button" onClick={handleLogin} disabled={loading}>
        {loading ? "로딩 중..." : "로그인"}
      </button>
      <div>
        <KaKaoLogin />
      </div>
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
      <ToastContainer />
    </div>
  );
};

export default Login;
