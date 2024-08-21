import { Navigate } from "react-router-dom";
import useAuth from "../utils/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // 로딩 중에는 스피너 또는 다른 로딩 UI를 보여줄 수 있습니다.
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
