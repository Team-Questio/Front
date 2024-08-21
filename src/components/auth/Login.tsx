import React, { useEffect, useState } from "react";
import Header from "../shared/Header";
import { useNavigate } from "react-router-dom";
import "../../styles/style.css";
import KakaoLogin from "../shared/KakaoLogin";
import api from "../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode"; // JWT 디코딩을 위해 추가

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
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    try {
      const response = await api.post("/auth/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const token = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        localStorage.setItem("token", token); // 토큰을 localStorage에 저장
        localStorage.setItem("refreshToken", refreshToken); // 토큰을 localStorage에 저장
        setTimeout(() => {
          toast.success("로그인 성공!");
          navigate("/portfolio-upload-text");
        }, 100); // 100ms 지연 후 리디렉션
      } else {
        toast.error("로그인 실패. 다시 시도하세요.");
        console.log("로그인 실패:", response);
      }
    } catch (error: any) {
      console.error("로그인 중 오류가 발생했습니다:", error);
      if (error.response && error.response.status === 404) {
        toast.error("사용자 정보를 찾을 수 없습니다.");
      } else {
        toast.error("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 토큰 유효성 검사
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as { exp: number };
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          // 토큰이 유효하면 자동으로 페이지 이동
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          navigate("/portfolio-upload-text"); // 이미 로그인된 경우 대시보드로 이동
        }
      } catch (error) {
        console.error("토큰 디코딩 중 오류 발생:", error);
        localStorage.removeItem("token"); // 유효하지 않은 토큰 제거
        localStorage.removeItem("refreshToken");
      }
    }
  }, [navigate]);

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
    </div>
  );
};

export default Login;
