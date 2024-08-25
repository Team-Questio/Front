import React, { useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import { CSSTransition } from "react-transition-group";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
  FaPlusCircle,
} from "react-icons/fa";

import { toast } from "react-toastify";
import api from "../../utils/api";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal"; // 모달 컴포넌트 임포트

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 80px);
  width: 100%;
  background-color: #101827;
  margin-top: 80px;
`;

const Sidebar = styled.div`
  width: 250px;
  height: 100%;
  background-color: #273344;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  overflow-y: auto;
`;

const MainContent = styled.div`
  height: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: auto;
  width: calc(100% - 250px);
  padding: 50px 20px 0 100px;
`;

const Title = styled.p`
  margin: 10pt 0;
  font-size: 23px;
  text-align: left;
  width: 50%;
  color: #ffffff;
`;

const PortfolioItem = styled.div`
  width: 80%;
  padding: 12px 20px;
  background-color: #52627c;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  white-space: nowrap;
  overflow: clip;
  text-overflow: ellipsis; /* 말줄임 적용 */

  &:hover {
    background-color: #2d3748;
  }

  &:disabled {
    background-color: #2d3748;
    cursor: not-allowed;
  }
`;

const PortfolioBackBox = styled.div`
  background-color: #1f2937;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const PortfolioTextArea = styled.div`
  padding: 10pt;
  font-size: 16px;
  background-color: #2d3748;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 10px;
  height: 200px;
  box-sizing: border-box;
  overflow-wrap: break-word;

  white-space: normal;
  overflow: scroll;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 100px;
  gap: 10px;
`;

const QuestionBox = styled.div`
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Question = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  background-color: #1f2937;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 100%;
  overflow: clip;
`;

const QuestionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  overflow: clip;
`;

const QuestionContentMain = styled.div`
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임 적용 */
`;

const QuestionFeedbackBox = styled.div`
  display: flex;
  gap: 10px;
  padding: 0px 20px;
`;

const Answer = styled.div`
  background-color: #2b3644;
  align-items: center;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  width: 100%;
  box-sizing: border-box;

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
  width: 100%;
  background-color: #404957;
  flex: 1;
  margin-top: 5px;
  padding: 10px;
  border-radius: 10px;
  color: #ffffff;
  border: 1px solid #ffffff;
  resize: none;
`;

const AnswerButton = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #374151;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d3748;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #374151;
  border-radius: 10px;
  background-color: #2d3748;
  font-size: 16px;
  color: white;
  box-sizing: border-box;
  height: 200px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #3c4960;
    background-color: #374151;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #374151;
  border: none;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  white-space: nowrap;
  overflow-x: clip;
  text-overflow: ellipsis;

  &:hover {
    background-color: #2d3748;
  }

  &:disabled {
    background-color: #2d3748;
    cursor: not-allowed;
  }
`;

const PlusIcon = styled(FaPlusCircle)`
  vertical-align: middle; /* 아이콘의 수직 정렬을 텍스트 중간에 맞춤 */
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffffff;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PortfolioPage: React.FC = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);
  const [portfolioList, setPortfolioList] = useState<string[]>([
    "저는 1녀1남의 막내로 태어나 화목한 가정에서...",
  ]);
  const [feedback, setFeedback] = useState<number[]>([1, 0, -1, 1]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newPortfolio, setNewPortfolio] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const questions = [
    "당신은 막내로서 어떤 역할을 주로 수행했나요",
    "화목한 가정은 어떻게 만들어질까요",
    "집에서 어떤 심부름 해보셨어요",
    "막내는 사랑을 많이 받나요",
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

  const handleAddPortfolio = async () => {
    if (!newPortfolio.trim()) {
      toast.error("포트폴리오 내용을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/portfolio",
        JSON.stringify({ content: newPortfolio })
      );

      console.log("Response:", response.data);

      toast.success("포트폴리오가 성공적으로 업로드되었습니다!");
      setLoading(false);
      setPortfolioList([newPortfolio, ...portfolioList]);
      setShowModal(false);
      setNewPortfolio("");
    } catch (error) {
      toast.error("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Sidebar>
          <Button onClick={() => setShowModal(true)}>
            <PlusIcon />
            <div>포트폴리오 추가</div>
          </Button>
          {portfolioList.map((portfolio, index) => (
            <PortfolioItem
              key={index}
              onClick={() => setSelectedQuestionIndex(index)}
            >
              {portfolio}
            </PortfolioItem>
          ))}
        </Sidebar>
        <MainContent>
          {selectedQuestionIndex !== null && (
            <>
              <Title>나의 포트폴리오</Title>
              <PortfolioBackBox>
                <PortfolioTextArea>
                  {portfolioList[selectedQuestionIndex]}
                </PortfolioTextArea>
              </PortfolioBackBox>
              <Title>예상 면접 질문</Title>
              <QuestionList>
                {questions.map((question, index) => (
                  <QuestionBox key={index} onClick={(e) => e.stopPropagation()}>
                    <Question
                      onClick={(e) => {
                        e.stopPropagation();
                        // setSelectedQuestionIndex(
                        //   selectedQuestionIndex === index ? null : index
                        // );
                      }}
                    >
                      <QuestionContent>
                        <QuestionContentMain>
                          {index + 1}. {question}
                        </QuestionContentMain>
                        <QuestionFeedbackBox>
                          {feedback[index] !== 1 ? (
                            <FaRegThumbsUp
                              onClick={() => toggleFeedBack(index, "up")}
                            />
                          ) : (
                            <FaThumbsUp
                              onClick={() => toggleFeedBack(index, "up")}
                            />
                          )}
                          {feedback[index] !== -1 ? (
                            <FaRegThumbsDown
                              onClick={() => toggleFeedBack(index, "down")}
                            />
                          ) : (
                            <FaThumbsDown
                              onClick={() => toggleFeedBack(index, "down")}
                            />
                          )}
                        </QuestionFeedbackBox>
                      </QuestionContent>
                    </Question>
                    {selectedQuestionIndex === index ? (
                      <>
                        <CSSTransition
                          in={index === selectedQuestionIndex}
                          timeout={200}
                          classNames="answer"
                          unmountOnExit
                        >
                          <Answer>
                            <AnswerTextArea placeholder="여기에 질문에 답을 적어주세요..." />
                            <AnswerButton>저장</AnswerButton>
                          </Answer>
                        </CSSTransition>
                      </>
                    ) : (
                      <></>
                    )}
                  </QuestionBox>
                ))}
              </QuestionList>
            </>
          )}
        </MainContent>
      </Container>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddPortfolio}
      >
        <TextArea
          placeholder="Enter your portfolio details here..."
          value={newPortfolio}
          onChange={(e) => setNewPortfolio(e.target.value)}
          disabled={loading}
        />
        <Button onClick={handleAddPortfolio} disabled={loading}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <PlusIcon />
              <div>포트폴리오 추가</div>
            </>
          )}
        </Button>
      </Modal>
    </>
  );
};

export default PortfolioPage;
