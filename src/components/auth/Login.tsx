import React, { useState } from "react";
import Header from "../shared/Header";
import { useNavigate } from "react-router-dom";
import "../../styles/style.css";
import KakaoLogin from "../shared/KakaoLogin";
import api from "../../utils/api";
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
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("요청 결과:", response); // 토큰을 콘솔에 출력

      if (response.status === 200) {
        const token = response.data.token;
        console.log("로그인 성공, 받은 토큰:", token);
        localStorage.setItem("token", token); // 토큰을 localStorage에 저장
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
        <KakaoLogin />
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  return (
    <div className={"light"}>
      <Header />
      <div className="wrapper">
        <LoginBox />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
