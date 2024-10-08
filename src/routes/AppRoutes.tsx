import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../components/HomePage";
import Login from "../components/auth/Login";
import FindPW from "../components/auth/FindPW";
import SignUp from "../components/auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import PortfolioPage from "../components/portfolio/PortfolioPage";
import OAuthCallback from "../components/auth/OAuthCallback";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/find-password" element={<FindPW />} />
      <Route path="/oauth" element={<OAuthCallback />} />

      {/* 보호된 경로들 */}
      <Route
        path="/portfolio"
        element={
          <ProtectedRoute>
            <PortfolioPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
