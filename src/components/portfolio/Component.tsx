import styled from "styled-components";

import { FaPlusCircle } from "react-icons/fa";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 80px);
  width: 100%;
  background-color: #101827;
  margin-top: 80px;
`;

export const Sidebar = styled.div`
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

export const MainContent = styled.div`
  height: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: auto;
  width: calc(100% - 250px);
  padding: 50px 20px 0 100px;
`;

export const Title = styled.p`
  margin: 10pt 0;
  font-size: 23px;
  text-align: left;
  width: 50%;
  color: #ffffff;
`;

export const PortfolioItem = styled.div`
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

export const PortfolioBackBox = styled.div`
  background-color: #1f2937;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const PortfolioTextArea = styled.div`
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

export const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 100px;
  gap: 10px;
`;

export const QuestionBox = styled.div`
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Question = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  background-color: #1f2937;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 100%;
  overflow: clip;
`;

export const QuestionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  overflow: clip;
`;

export const QuestionContentMain = styled.div`
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임 적용 */
`;

export const QuestionFeedbackBox = styled.div`
  display: flex;
  gap: 10px;
  padding: 0px 20px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
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

export const Button = styled.button`
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

export const ModalButton = styled.button`
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

export const PlusIcon = styled(FaPlusCircle)`
  vertical-align: middle; /* 아이콘의 수직 정렬을 텍스트 중간에 맞춤 */
`;

export const FeedbackTextArea = styled.textarea`
  width: 95%;
  height: 95%;
  padding: 12px;
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

export const VideoDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
