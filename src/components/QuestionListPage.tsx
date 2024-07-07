import React, { useState } from "react";
import Header from "./Header";
import "../styles/style-question-list-page.css";
import { CSSTransition } from "react-transition-group";

const QuestionListPage: React.FC = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = React.useState(-1);
  const [portfolio] = useState<string>(
    "저는 1녀1남의 막내로 태어나 화목한 가정에서..."
  );
  const [darkMode, setDarkMode] = useState(false);

  const questions = [
    "당신은 막내로서 어떤 역할을 주로 수행했나요",
    "화목한 가정은 어떻게 만들어질까요",
    "집에서 어떤 심부름 해보셨어요",
    "막내는 사랑을 많이 받나요",
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={darkMode ? "dark" : "light"}
      onClick={() => {
        setSelectedQuestionIndex(-1);
      }}
    >
      <Header toggleDarkMode={toggleDarkMode} />
      <div className="content">
        <p className="title">나의 포트폴리오</p>
        <div className="portfolio-back-box">
          <div className="portfolio-text-area">{portfolio}</div>
        </div>
        <p className="title">예상 면접 질문</p>
        <div className="question-list">
          {questions.map((question, index) => (
            <div key={index} className="question-box">
              <div
                className="question"
                onClick={(e) => {
                  e.stopPropagation();

                  if (selectedQuestionIndex === index) {
                    setSelectedQuestionIndex(-1);
                  } else {
                    setSelectedQuestionIndex(index);
                  }
                }}
              >
                <div className="question-content">
                  <div className="question-index">{index + 1}.</div> {question}
                </div>
              </div>
              <CSSTransition
                in={index === selectedQuestionIndex}
                timeout={200}
                classNames="answer"
                unmountOnExit
              >
                <div className="answer">
                  <textarea
                    className="answer-textarea"
                    placeholder="여기에 질문에 답을 적어주세요..."
                  />
                  <button className="answer-button">Button</button>
                </div>
              </CSSTransition>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionListPage;
