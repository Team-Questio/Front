import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "../shared/KakaoLogin";
import api from "../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

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
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #374151;
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

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #374151;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d3748;
  }

  &:disabled {
    background-color: #2d3748;
    cursor: not-allowed;
  }
`;

const SubItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const SubItem = styled.div`
  display: flex;
`;

const Link = styled.div`
  text-decoration: none;
  cursor: pointer;
  opacity: 0.7;
  color: #ffffff;

  &:hover {
    text-decoration: underline;
    opacity: 1;
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
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => (
  <InputContainer>
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </InputContainer>
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
    <FormContainer>
      <h2 style={{ color: "#ffffff", marginBottom: "40px" }}>로그인</h2>
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
      <div style={{ height: "20px" }} />
      <SubItemContainer>
        <SubItem>
          <Link onClick={handleSignUpButtonClick}>회원가입</Link>
          <div style={{ width: "10px" }} />
          <Link onClick={handleFindPWButtonClick}>비밀번호 찾기</Link>
        </SubItem>
      </SubItemContainer>
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? <Spinner /> : "로그인"}
      </Button>

      <KakaoLogin />
    </FormContainer>
  );
};

const Login: React.FC = () => {
  return (
    <Container>
      <Header />
      <LoginBox />
    </Container>
  );
};

export default Login;
