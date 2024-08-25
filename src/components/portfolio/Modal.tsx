import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa"; // X 이모티콘 임포트

// 모달 배경
const ModalBackground = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 내용
const ModalContent = styled.div`
  background-color: #1f2937;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 500px;
  position: relative; /* 상대 위치로 변경 */
  display: flex;
  flex-direction: column;
  align-items: end;
`;

// X 이모티콘 스타일
const CloseIcon = styled(FaTimes)`
  color: red;
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 10px;
`;

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

// 모달 컴포넌트
const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  return (
    <ModalBackground show={show}>
      <ModalContent>
        <CloseIcon onClick={onClose} /> {/* X 이모티콘 추가 */}
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
