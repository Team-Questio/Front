import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../../service/redux/useAppDispatch";
import { RootState } from "../../service/redux/store";
import {
  setSelectedPortfolioIndex,
  fetchPortfolio,
  addPortfolio,
  updateFeedback,
} from "../../service/redux/portfolioSlice";
import { sendServiceFeedback } from "../../service/feedbackService";

import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import Header from "../shared/Header";
import Modal from "./Modal";
import {
  Button,
  Container,
  FeedbackTextArea,
  MainContent,
  ModalButton,
  PlusIcon,
  PortfolioBackBox,
  PortfolioItem,
  PortfolioTextArea,
  Question,
  QuestionBox,
  QuestionContent,
  QuestionContentMain,
  QuestionFeedbackBox,
  QuestionList,
  Sidebar,
  Spinner,
  TextArea,
  Title,
} from "./Component";

const PortfolioPage: React.FC = () => {
  const { portfolio, selectedPortfolioIndex, loading } = useSelector(
    (state: RootState) => state.portfolio
  );
  const dispatch = useAppDispatch();

  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newPortfolio, setNewPortfolio] = useState<string>("");
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [serviceFeedback, setServiceFeedback] = useState<string>("");

  const handleToggleFeedBack = (questId: number, feedback: number) => {
    dispatch(updateFeedback({ questId: questId, feedback: feedback })) // 실제 questId와 feedback을 전달해야 함
      .unwrap()
      .then(() => {
        toast.success("피드백 고마워요!");
      })
      .catch(() => {
        toast.error("피드백 제출에 실패했어요");
      });
  };

  const handleAddPortfolio = () => {
    if (!newPortfolio.trim()) {
      toast.error("포트폴리오 내용을 입력해주세요.");
      return;
    }
    setPageLoading(true);

    dispatch(addPortfolio(newPortfolio))
      .unwrap()
      .then(() => {
        toast.success("포트폴리오가 성공적으로 업로드되었습니다!");
        setNewPortfolio("");
        setShowModal(false);
        setPageLoading(false);
        setShowFeedbackModal(true);
      })
      .catch(() => {
        toast.error("포트폴리오 업로드에 실패했습니다.");
        setPageLoading(false);
      });
  };

  const handleSendServiceFeedback = async () => {
    setPageLoading(true);

    try {
      await sendServiceFeedback(serviceFeedback);
      setShowFeedbackModal(false);
      setServiceFeedback("");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchPortfolio());
  }, [dispatch]);

  const handlePortfolioClick = (index: number) => {
    dispatch(setSelectedPortfolioIndex(index));
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
          {portfolio.map((portfolio, index) => (
            <PortfolioItem
              key={index}
              onClick={() =>
                handlePortfolioClick(portfolio.portfolio.portfolioId)
              }
            >
              {portfolio.portfolio.content}
            </PortfolioItem>
          ))}
        </Sidebar>
        <MainContent>
          {selectedPortfolioIndex !== null && (
            <>
              <Title>나의 포트폴리오</Title>
              <PortfolioBackBox>
                <PortfolioTextArea>
                  {
                    portfolio.find((p) => {
                      return (
                        p.portfolio.portfolioId ===
                        (selectedPortfolioIndex ?? 0)
                      );
                    })?.portfolio.content
                  }
                </PortfolioTextArea>
              </PortfolioBackBox>
              <Title>예상 면접 질문</Title>
              <QuestionList>
                {portfolio
                  .find((p) => {
                    return (
                      p.portfolio.portfolioId === (selectedPortfolioIndex ?? 0)
                    );
                  })
                  ?.quests.map((question, index) => (
                    <QuestionBox
                      key={question.questId}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Question>
                        <QuestionContent>
                          <QuestionContentMain>
                            {index + 1}. {question.question}
                          </QuestionContentMain>
                          <QuestionFeedbackBox>
                            {(question.feedback ?? 0) !== 1 ? (
                              <FaRegThumbsUp
                                onClick={() =>
                                  handleToggleFeedBack(question.questId, 1)
                                }
                              />
                            ) : (
                              <FaThumbsUp
                                onClick={() =>
                                  handleToggleFeedBack(question.questId, 0)
                                }
                              />
                            )}
                            {(question.feedback ?? 0) !== -1 ? (
                              <FaRegThumbsDown
                                onClick={() =>
                                  handleToggleFeedBack(question.questId, -1)
                                }
                              />
                            ) : (
                              <FaThumbsDown
                                onClick={() =>
                                  handleToggleFeedBack(question.questId, 0)
                                }
                              />
                            )}
                          </QuestionFeedbackBox>
                        </QuestionContent>
                      </Question>
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
          disabled={pageLoading}
        />
        <ModalButton onClick={handleAddPortfolio} disabled={pageLoading}>
          {pageLoading ? (
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
          disabled={pageLoading}
        />
        <ModalButton onClick={handleSendServiceFeedback}>제출</ModalButton>
      </Modal>
    </>
  );
};

export default PortfolioPage;
