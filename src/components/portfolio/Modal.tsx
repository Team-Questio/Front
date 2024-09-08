import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa"; // X 이모티콘 임포트

// 모달 배경
const ModalBackground = styled.div<{ $show: boolean; $zindex?: number }>`
  display: ${(props) => (props.$show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: ${(props) => props.$zindex ?? "1000"};
  flex-direction: column;
`;

// 모달 내용
const ModalContent = styled.div`
  background-color: #1f2937;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 60%;
  height: 70%;
  gap: 20px;
  position: relative; /* 상대 위치로 변경 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: space-between; /* 가로 중앙 정렬을 원한다면 사용 */
  gap: 10px; /* 요소 간의 간격 */
`;

// X 이모티콘 스타일
const CloseIcon = styled(FaTimes)`
  color: red;
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 10px;
`;

const ModalTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 20px;
  color: #ffffff;
  cursor: default;
`;

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  zindex?: number;
}

// 모달 컴포넌트
export const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  children,
  title,
  zindex,
}) => {
  return (
    <ModalBackground $show={show && show} $zindex={zindex}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title ?? ""}</ModalTitle>
          <CloseIcon onClick={onClose} />
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

// export const FeedbackContainer = styled.div`
//   width: 300px;
//   padding: 20px;
//   background-color: #f5f7fa;
//   border-radius: 10px;
//   box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
//   font-family: Arial, sans-serif;
// `;

// export const FeedbackTitle = styled.h2`
//   margin-bottom: 20px;
//   font-size: 18px;
//   color: #333;
// `;

// export const EmojiContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 20px;
// `;

// export const Emoji = styled.div`
//   width: 50px;
//   height: 50px;
//   background-color: ${(props) => "#ffeb3b"};
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 24px;
//   cursor: pointer;
// `;

// export const SubTitle = styled.h3`
//   font-size: 14px;
//   color: #333;
//   margin-bottom: 10px;
// `;

// export const TagContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
//   margin-bottom: 20px;
// `;

// export const Tag = styled.button`
//   padding: 8px 12px;
//   background-color: #e0e7ff;
//   border: none;
//   border-radius: 20px;
//   font-size: 14px;
//   color: #333;
//   cursor: pointer;

//   &:hover {
//     background-color: #c7d2fe;
//   }

//   &:active {
//     background-color: #a5b4fc;
//   }
// `;

// export const SuggestionInput = styled.textarea`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #d1d5db;
//   border-radius: 5px;
//   font-size: 14px;
//   margin-bottom: 20px;
//   resize: none;
// `;

// export const SubmitButton = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #3b82f6;
//   border: none;
//   border-radius: 5px;
//   font-size: 16px;
//   color: white;
//   cursor: pointer;

//   &:hover {
//     background-color: #60a5fa;
//   }

// `;

// export const FeedbackModal: React.FC<ModalProps> = ({
//   show,
//   onClose,
//   zindex,
// }) => {
//   return (
//     <ModalBackground $show={show && show} $zindex={zindex}>
//       <FeedbackContainer>
//         <FeedbackTitle>Feedback</FeedbackTitle>
//         <CloseIcon onClick={onClose} />
//         <EmojiContainer>
//           <Emoji>😡</Emoji>
//           <Emoji>😟</Emoji>
//           <Emoji>😐</Emoji>
//           <Emoji>😊</Emoji>
//           <Emoji>😍</Emoji>
//         </EmojiContainer>
//         <SubTitle>Tell us what can be Improved?</SubTitle>
//         <TagContainer>
//           <Tag>Overall Service</Tag>
//           <Tag>Customer Support</Tag>
//           <Tag>Pickup & Delivery Service</Tag>
//           <Tag>Service & Efficiency</Tag>
//           <Tag>Transparency</Tag>
//         </TagContainer>
//         <SuggestionInput placeholder="어떤 기능이 좋고 더 필요한가요..." />
//         <SubmitButton>Submit</SubmitButton>
//       </FeedbackContainer>
//     </ModalBackground>
//   );
// };
