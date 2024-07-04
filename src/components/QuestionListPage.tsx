import React, { useState } from 'react';
import Header from './Header';
import '../styles/style.css';

const QuestionListPage: React.FC = () => {
  const [portfolio, setPortfolio] = useState<string>('저는 1녀1남의 막내로 태어나 화목한 가정에서...');
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [darkMode, setDarkMode] = useState(false);

  const handleAnswerChange = (questionId: number) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnswers({
      ...answers,
      [questionId]: event.target.value,
    });
  };

  const questions = [
    '당신은 막내로서 어떤 역할을 주로 수행했나요',
    '화목한 가정은 어떻게 만들어질까요',
    '집에서 어떤 심부름 해보셨어요',
    '막내는 사랑을 많이 받나요',
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <Header toggleDarkMode={toggleDarkMode} />
      <div className="content">
        <p>나의 포트폴리오</p>
        <div className='portfolio-back-box'>
          <div className='portfolio-text-area'>{portfolio}</div>
        </div>
        <p>예상 면접 질문</p>
        <div className='question-list'>
          {questions.map((question, index)=>{
            

            return <><div className="question-box"><div className='question-index'>{index+1}.</div><div>{question}</div></div></>;
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionListPage;