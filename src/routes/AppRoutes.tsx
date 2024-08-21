// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../components/HomePage";
import PortfolioUploadPageText from "../components/portfolio/PortfolioUploadPage";
import QuestionListPage from "../components/portfolio/QuestionListPage";
import Login from "../components/auth/Login";
import FindPW from "../components/auth/FindPW";
import SignUp from "../components/auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/find-password" element={<FindPW />} />

      {/* 보호된 경로들 */}
      <Route
        element={
          <ProtectedRoute>
            <React.Fragment />
          </ProtectedRoute>
        }
      >
        <Route
          path="/portfolio-upload-text"
          element={<PortfolioUploadPageText />}
        />
        <Route path="/question-list" element={<QuestionListPage />} />
        {/* <Route path="/portfolio-upload-pdf" element={<PortfolioUploadPagePDF />} /> */}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
