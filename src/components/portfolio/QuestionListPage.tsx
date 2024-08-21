import React, { useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import { CSSTransition } from "react-transition-group";

import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #1f2937;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
`;

const Title = styled.p`
  margin: 10pt 0;
  font-size: 23px;
  text-align: left;
  width: 50%;
`;

const PortfolioBackBox = styled.div`
  background-color: #1f2937;
  border: none;
  border-radius: 12px;
  padding: 10pt;
  margin-bottom: 20pt;
  width: 50%;
`;

const PortfolioTextArea = styled.div`
  padding: 10pt;
  font-size: 16px;
  background-color: #2d3748;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 12px;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
`;

const QuestionBox = styled.div`
  border-radius: 10px;
  border: none;
  margin-bottom: 10px;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Question = styled.div`
  padding: 20px 10px;
  cursor: pointer;
  background-color: hsl(214, 23%, 22%);
  width: 100%;
`;

const QuestionContent = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 95%;
`;

const QuestionFeedbackBox = styled.div`
  display: flex;
  gap: 10px;
`;

const QuestionIndex = styled.div`
  margin-right: 10px;
`;

const Answer = styled.div`
  background-color: #2b3644;
  align-items: center;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  width: 100%;

  &.answer-enter {
    max-height: 0;
    opacity: 0;
  }

  &.answer-enter-active {
    max-height: 200px;
    opacity: 1;
    transition: max-height 200ms ease-in, opacity 200ms ease-in;
  }

  &.answer-enter-done {
    max-height: fit-content;
    opacity: 1;
  }

  &.answer-exit {
    max-height: 200px;
    opacity: 1;
  }

  &.answer-exit-active {
    max-height: 0;
    opacity: 0;
    transition: max-height 200ms ease-in, opacity 200ms ease-in;
  }
`;

const AnswerTextArea = styled.textarea`
  width: 95%;
  background-color: #404957;
  flex: 1;
  margin-top: 5px;
`;

const AnswerButton = styled.button`
  margin: 10px;
  width: fit-content;
  padding: 10pt 15pt;
  font-size: 14px;
  background-color: #374151;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2d3748;
  }
`;

// Component
const QuestionListPage: React.FC = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);
  const [portfolio] = useState<string>(
    "저는 1녀1남의 막내로 태어나 화목한 가정에서..."
  );
  const [feedback, setFeedback] = useState([1, 0, -1, 1]);

  const questions = [
    "당신은 막내로서 어떤 역할을 주로 수행했나요",
    "화목한 가정은 어떻게 만들어질까요",
    "집에서 어떤 심부름 해보셨어요",
    "막내는 사랑을 많이 받나요",
  ];

  const toggleFeedBack = (index: number, position: string) => {
    const newFeedback = feedback.map((item, i) =>
      i === index
        ? position === "up"
          ? item === 1
            ? 0
            : 1
          : item === -1
          ? 0
          : -1
        : item
    );
    setFeedback(newFeedback);
  };

  return (
    <Container
      onClick={() => {
        setSelectedQuestionIndex(null);
      }}
    >
      <Header />
      <Content>
        <Title>나의 포트폴리오</Title>
        <PortfolioBackBox>
          <PortfolioTextArea>{portfolio}</PortfolioTextArea>
        </PortfolioBackBox>
        <Title>예상 면접 질문</Title>
        <QuestionList>
          {questions.map((question, index) => (
            <QuestionBox
              onClick={(e) => {
                e.stopPropagation();
              }}
              key={index}
            >
              <Question
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedQuestionIndex(
                    selectedQuestionIndex === index ? null : index
                  );
                }}
              >
                <QuestionContent>
                  <QuestionIndex>
                    {index + 1}. {question}
                  </QuestionIndex>
                  <QuestionFeedbackBox>
                    {feedback[index] !== 1 ? (
                      <FaRegThumbsUp
                        onClick={() => {
                          toggleFeedBack(index, "up");
                        }}
                      />
                    ) : (
                      <FaThumbsUp
                        onClick={() => {
                          toggleFeedBack(index, "up");
                        }}
                      />
                    )}
                    {feedback[index] !== -1 ? (
                      <FaRegThumbsDown
                        onClick={() => {
                          toggleFeedBack(index, "down");
                        }}
                      />
                    ) : (
                      <FaThumbsDown
                        onClick={() => {
                          toggleFeedBack(index, "down");
                        }}
                      />
                    )}
                  </QuestionFeedbackBox>
                </QuestionContent>
              </Question>
              <CSSTransition
                in={index === selectedQuestionIndex}
                timeout={200}
                classNames="answer"
                unmountOnExit
              >
                <Answer>
                  <AnswerTextArea placeholder="여기에 질문에 답을 적어주세요..." />
                  <AnswerButton>Button</AnswerButton>
                </Answer>
              </CSSTransition>
            </QuestionBox>
          ))}
        </QuestionList>
      </Content>
    </Container>
  );
};

export default QuestionListPage;
