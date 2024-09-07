import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/useAppDispatch";
import { RootState } from "../../redux/store";
import {
  setSelectedPortfolioIndex,
  fetchPortfolio,
  addPortfolio,
  updateFeedback,
  fetchRemaining,
  fetchYoutubeURL,
} from "../../redux/portfolio/portfolioSlice";
import { sendServiceFeedback } from "../../api/feedback";

import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import Header from "../shared/Header";
import { Modal } from "./Modal";
import {
  Button,
  Container,
  FeedbackButton,
  FixedContainer,
  Icon,
  IconContainer,
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
  ScrollableContainer,
  Sidebar,
  TextArea,
  TextContainer,
  Title,
  VideoDiv,
} from "./Component";
import ReactPlayer from "react-player";

const PortfolioPage: React.FC = () => {
  const {
    portfolio,
    remainToUpload,
    selectedPortfolioIndex,
    isAddingPortfolio,
    youtubeURL,
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
      })
      .catch((error) => {
        toast.update(id, {
          render: "피드백 제출에 실패했어요",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  const handlePortfolioAddButton = () => {
    dispatch(fetchYoutubeURL());

    if (remainToUpload == 0) toast.error("업로드 제한에 도달했어요");
    else setShowModal(true);
  };

  const handleAddPortfolio = () => {
    if (!newPortfolio.trim()) {
      toast.error("포트폴리오 내용을 입력해주세요.");
      return;
    }
    const id = toast.loading("포트폴리오 업로드 중...");
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

  const _fetchRemaining = () => {
    dispatch(fetchRemaining());
  };

  const _fetchPortfolio = () => {
    const id = toast.loading("포트폴리오 불러오는 중...");

    dispatch(fetchPortfolio())
      .unwrap()
      .then(() => {
        toast.update(id, {
          render: "포트폴리오를 불러왔어요",
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
    _fetchRemaining();
    _fetchPortfolio();
  }, []);

  const handlePortfolioClick = (index: number) => {
    dispatch(setSelectedPortfolioIndex(index));
  };

  return (
    <>
      <Header />
      <Container>
        <Sidebar>
          <FixedContainer>
            <Button onClick={handlePortfolioAddButton}>
              <PlusIcon />
              <div style={{ fontSize: 15 }}>포트폴리오 추가 </div>
            </Button>
            <div style={{ color: "grey", fontSize: 15, marginTop: 10 }}>
              {" "}
              남은 횟수 {remainToUpload} 회
            </div>
          </FixedContainer>

          <ScrollableContainer>
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
          </ScrollableContainer>

          <FeedbackButton
            onClick={() => {
              const id = toast.loading("설문조사로 이동 중...");
              window.open("https://forms.gle/G75DRY9QfubSHubm8", "_blank");

              setTimeout(() => {
                toast.update(id, {
                  isLoading: false,
                  autoClose: 0,
                });
              }, 2000);
            }}
          >
            <IconContainer>
              <Icon>✏️</Icon> {/* 아이콘을 추가하세요 */}
            </IconContainer>
            <TextContainer>
              <div style={{ fontSize: 14, fontWeight: "bold" }}>
                피드백 하러가기
              </div>
              <div style={{ fontSize: 12, color: "#8A8A8A" }}>
                추첨 경품도 받아가세요
              </div>
            </TextContainer>
          </FeedbackButton>
        </Sidebar>
        <MainContent>
          {selectedPortfolioIndex !== null && (
            <>
              <Title>나의 포트폴리오 / 자소서</Title>
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
                            {(question.feedback ?? 0) !== "GOOD" ? (
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
                            {(question.feedback ?? 0) !== "BAD" ? (
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
          <div>질문 생성하기</div>
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
            url={youtubeURL}
            playing={showYoutubeModal}
            loop={false}
            controls
            width={"100%"}
            height={"100%"}
          />{" "}
        </VideoDiv>

        <ModalButton
          onClick={() => setShowYoutubeModal(false)}
          disabled={isAddingPortfolio}
        >
          {isAddingPortfolio ? "질문 생성 중..." : "질문 보러가기"}
        </ModalButton>
      </Modal>

      {/* <FeedbackModal
        show={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        zindex={1}
      ></FeedbackModal> */}
    </>
  );
};

export default PortfolioPage;
