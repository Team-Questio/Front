import { Navigate } from "react-router-dom";
import useAuth from "../api/useAuth";
import { toast } from "react-toastify";
import styled, { keyframes } from "styled-components";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffffff;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // 로딩 중에는 스피너 또는 다른 로딩 UI를 보여줍니다.
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  if (!isAuthenticated) {
    console.error("로그인이 필요합니다");
    toast.error("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
