import React, { useState, useEffect } from "react";
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
import axios from "axios";

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
  height: 100%;
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

const ModalButton = styled.button`
  width: 50%;
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

const FeedbackTextArea = styled.textarea`
  width: 95%;
  height: 95%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #374151;
  border-radius: 10px;
  background-color: #2d3748;
  font-size: 16px;
  color: white;
  resize: none;

  &:focus {
    outline: none;
    border-color: #3c4960;
    background-color: #374151;
  }
`;

interface Question {
  questId: number;
  question: string;
  feedback?: number;
}

interface Portfolio {
  portfolioId: number;
  content: string;
}

interface PortfolioData {
  portfolio: Portfolio;
  quests: Question[];
}

const PortfolioPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newPortfolio, setNewPortfolio] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [serviceFeedback, setServiceFeedback] = useState<string>("");

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData[]>([]); // 포트폴리오 데이터 상태 추가
  const [questions, setQuestions] = useState<Question[]>([]); // 질문 리스트 상태 추가

  const toggleFeedBack = (questId: number, feedback: number) => {
    // questions 배열을 map으로 순회하면서 questId에 해당하는 question을 업데이트
    const updatedQuestions = questions.map((q) => {
      if (q.questId === questId) {
        api.post("/portfolio/quest/" + questId, {
          feedback: feedback,
        });

        return {
          ...q,
          feedback: feedback,
        };
      }
      // questId가 일치하지 않으면 원래 객체 그대로 반환
      return q;
    });

    // 상태 업데이트
    setQuestions(updatedQuestions);

    toast.success("피드백 보냈어요!");
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
      fetchPortfolioData();
      setShowModal(false);
      setNewPortfolio("");

      // 피드백 모달 표시
      setShowFeedbackModal(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // error가 AxiosError 타입임을 보장
        if (error.response?.status === 403) {
          toast.error(
            "업로드 횟수 제한에 도달했습니다. 나중에 다시 시도해주세요."
          );
        } else {
          toast.error("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        // 다른 타입의 오류 처리
        toast.error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
      }
      setLoading(false);
    }
  };

  const handleSendServiceFeedback = async () => {
    setLoading(true);

    try {
      const response = await api.post(
        "/feedback",
        JSON.stringify({ feedback: serviceFeedback })
      );
      console.log("Response:", response.data);

      toast.success("피드백 고마워요!");
      setLoading(false);
      setShowFeedbackModal(false);
      setServiceFeedback("");
    } catch (error) {
      toast.error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  };

  const fetchPortfolioData = async () => {
    try {
      const response = await api.get<PortfolioData[]>("/portfolio");
      setPortfolioData(response.data);
    } catch (error) {
      toast.error("포트폴리오 데이터를 가져오는데 실패했습니다.");
    }
  };

  // 포트폴리오 데이터 가져오기
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  // 포트폴리오 항목 클릭 시 질문 리스트 설정
  const handlePortfolioClick = (index: number) => {
    setSelectedQuestionIndex(index);
    setQuestions(portfolioData[index].quests);
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
          {portfolioData.map((portfolio, index) => (
            <PortfolioItem
              key={portfolio.portfolio.portfolioId}
              onClick={() => handlePortfolioClick(index)}
            >
              {portfolio.portfolio.content}
            </PortfolioItem>
          ))}
        </Sidebar>
        <MainContent>
          {selectedQuestionIndex !== null && (
            <>
              <Title>나의 포트폴리오</Title>
              <PortfolioBackBox>
                <PortfolioTextArea>
                  {portfolioData[selectedQuestionIndex].portfolio.content}
                </PortfolioTextArea>
              </PortfolioBackBox>
              <Title>예상 면접 질문</Title>
              <QuestionList>
                {questions.map((question, index) => (
                  <QuestionBox
                    key={question.questId}
                    onClick={(e) => e.stopPropagation()}
                  >
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
                          {index + 1}. {question.question}
                        </QuestionContentMain>
                        <QuestionFeedbackBox>
                          {(question.feedback ?? 0) != 1 ? (
                            <FaRegThumbsUp
                              onClick={() =>
                                toggleFeedBack(question.questId, 1)
                              }
                            />
                          ) : (
                            <FaThumbsUp
                              onClick={() =>
                                toggleFeedBack(question.questId, 0)
                              }
                            />
                          )}
                          {(question.feedback ?? 0) != -1 ? (
                            <FaRegThumbsDown
                              onClick={() =>
                                toggleFeedBack(question.questId, -1)
                              }
                            />
                          ) : (
                            <FaThumbsDown
                              onClick={() =>
                                toggleFeedBack(question.questId, 0)
                              }
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
        title="포트폴리오를 업로드 해봐요"
      >
        <TextArea
          placeholder="Enter your portfolio details here..."
          value={newPortfolio}
          onChange={(e) => setNewPortfolio(e.target.value)}
          disabled={loading}
        />
        <ModalButton onClick={handleAddPortfolio} disabled={loading}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div>질문 샐성하기</div>
            </>
          )}
        </ModalButton>
      </Modal>
      <Modal
        show={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        title="피드백을 남겨주세요"
      >
        <FeedbackTextArea
          value={serviceFeedback}
          placeholder="피드백을 입력하세요..."
          onChange={(e) => setServiceFeedback(e.target.value)}
          disabled={loading}
        />
        <ModalButton onClick={handleSendServiceFeedback}>제출</ModalButton>
      </Modal>
    </>
  );
};

export default PortfolioPage;
