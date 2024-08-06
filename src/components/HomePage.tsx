import React, { useState } from "react";
import Header from "./Header";

import { useNavigate } from "react-router-dom";

import "../styles/style.css";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
    console.log("hi");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Header toggleDarkMode={toggleDarkMode} />
      <div className="content">
        <h1>Questio와 면접을 준비해봐요</h1>
        <p>
          포트폴리오를 분석해서 면접을 도와드릴게요
          <br />
          당신의 잠재력을 일깨워드릴게요
        </p>
        <button onClick={handleButtonClick} className="start-button">
          시작해보기
        </button>
      </div>
    </div>
  );
};

export default App;
