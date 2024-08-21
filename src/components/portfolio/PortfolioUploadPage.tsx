import React, { useState } from "react";
import Header from "../shared/Header";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import api from "../../utils/api";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/style.css"


const PortfolioUploadPageText: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleButtonClick = async () => {
    if (!content.trim()) {
      toast.error("포트폴리오 내용을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/portfolio", { content });
      toast.success("포트폴리오가 성공적으로 업로드되었습니다!");
      setLoading(false);
      setTimeout(() => {
        navigate("/question-list");
      }, 2000);
    } catch (error) {
      toast.error("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  };

  return (
    <div className={"dark"}>
      <Header />
      <div className="content">
        <h1>포트폴리오를 올려봐요</h1>
        <p>포트폴리오 정보를 입력하고 맞춤형 질문을 받아보세요</p>
        <div className="input-back-box">
          <textarea
            placeholder="Enter your portfolio details here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          ></textarea>
          <button
            className="submit-button"
            onClick={handleButtonClick}
            disabled={loading}
          >
            {loading ? "업로드 중..." : "업로드"}
          </button>
          {loading && <div className="loading-spinner"></div>}
        </div>
      </div>
    </div>
  );
};

export default PortfolioUploadPageText;
