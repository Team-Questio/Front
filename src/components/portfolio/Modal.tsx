import React from "react";
import styled from "styled-components";

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
`;

const ModalButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background-color: #374151;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d3748;
  }

  &:disabled {
    background-color: #2d3748;
    cursor: not-allowed;
  }
`;

// 모달 컴포넌트
interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

// 모달 컴포넌트
const Modal: React.FC<ModalProps> = ({ show, onClose, onSubmit, children }) => {
  return (
    <ModalBackground show={show}>
      <ModalContent>
        {children}
        <ModalButton onClick={onSubmit}>업로드</ModalButton>
        <ModalButton onClick={onClose}>취소</ModalButton>
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
