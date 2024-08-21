import React, { useState } from "react";
import Header from "../shared/Header";
import { ToastContainer } from "react-toastify";


import "../styles/styleForPortfolioUploadPage.css";

const PortfolioUploadPageText: React.FC = () => {
  const [text, setText] = useState<string>("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className={"dark"}>
      <Header />
      <div className="content">
        <h1>포트폴리오를 올려봐요</h1>
        <p>포트폴리오 정보를 입력하고 맞춤형 질문을 받아보세요</p>
        <div className="input-back-box">
          <textarea placeholder="Enter your portfolio details here..."></textarea>
          <button className="submit-button">업로드</button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioUploadPageText;
