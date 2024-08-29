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
  TextArea,
  Title,
  VideoDiv,
} from "./Component";
import ReactPlayer from "react-player";

const PortfolioPage: React.FC = () => {
  const {
    portfolio,
    remainToUpload,
    selectedPortfolioIndex,
    portfolioLoading,
  } = useSelector((state: RootState) => state.portfolio);
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [newPortfolio, setNewPortfolio] = useState<string>("");
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState<boolean>(false);
  const [serviceFeedback, setServiceFeedback] = useState<string>("");

  const handleToggleFeedBack = (questId: number, feedback: number) => {
    const id = toast.loading("피드백 전송 중...");

    dispatch(updateFeedback({ questId: questId, feedback: feedback })) // 실제 questId와 feedback을 전달해야 함
      .unwrap()
      .then(() => {
        toast.update(id, {
          render: "피드백 고마워요!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        _fetchPortfolio();
      })
      .catch((error) => {
        toast.update(id, {
          // render: error.errorMessage,
          render: "피드백 제출에 실패했어요",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  const handlePortfolioAddButton = () => {
    if (remainToUpload == 0) toast.error("업로드 제한에 도달했어요");
    else setShowModal(true);
  };

  const handleAddPortfolio = () => {
    if (!newPortfolio.trim()) {
      toast.error("포트폴리오 내용을 입력해주세요.");
      return;
    }
    const id = toast.loading("포폴 업로드 중...");
    setShowModal(false);
    setShowYoutubeModal(true);

    dispatch(addPortfolio(newPortfolio))
      .unwrap()
      .then(() => {
        toast.update(id, {
          render: "포트폴리오가 성공적으로 업로드되었습니다!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        setNewPortfolio("");
      })
      .catch((error) => {
        toast.update(id, {
          render: error.errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        setNewPortfolio("");
      });
  };

  const handleSendServiceFeedback = async () => {
    const id = toast.loading("피드백 전송 중...");

    try {
      await sendServiceFeedback(serviceFeedback);

      setShowFeedbackModal(false);
      setServiceFeedback("");
    } finally {
      toast.update(id, {
        render: "피드백 고마워요!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const _fetchPortfolio = () => {
    const id = toast.loading("포폴 불러오는 중...");

    dispatch(fetchPortfolio())
      .unwrap()
      .then(() => {
        toast.update(id, {
          render: "포폴을 불러왔어요",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: error.errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  useEffect(() => {
    _fetchPortfolio();
  }, []);

  const handlePortfolioClick = (index: number) => {
    dispatch(setSelectedPortfolioIndex(index));
  };

  useEffect(() => {
    if (remainToUpload == 0) setShowFeedbackModal(true);
  }, [remainToUpload]);

  return (
    <>
      <Header />
      <Container>
        <Sidebar>
          <Button onClick={handlePortfolioAddButton}>
            <PlusIcon />
            <div>포트폴리오 추가 {remainToUpload} / 3</div>
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
        zindex={3}
      >
        <TextArea
          placeholder="Enter your portfolio details here..."
          value={newPortfolio}
          onChange={(e) => setNewPortfolio(e.target.value)}
        />
        <ModalButton onClick={handleAddPortfolio}>
          <div>질문 샐성하기</div>
        </ModalButton>
      </Modal>

      <Modal
        show={showYoutubeModal}
        onClose={() => setShowYoutubeModal(false)}
        title="테코톡으로 CS 지식을 쌓아봐요"
        zindex={2}
      >
        <VideoDiv>
          <ReactPlayer
            url={"https://youtu.be/wPdH7lJ8jf0"}
            playing={showYoutubeModal}
            loop={false}
            controls
            width={"100%"}
            height={"100%"}
          />{" "}
        </VideoDiv>

        <ModalButton onClick={() => setShowYoutubeModal(false)}>
          질문 보러가기
        </ModalButton>
      </Modal>

      <Modal
        show={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        title="피드백을 남겨주세요"
        zindex={1}
      >
        <FeedbackTextArea
          value={serviceFeedback}
          placeholder="피드백을 입력하세요..."
          onChange={(e) => setServiceFeedback(e.target.value)}
        />
        <ModalButton onClick={handleSendServiceFeedback}>제출</ModalButton>
      </Modal>
    </>
  );
};

export default PortfolioPage;
