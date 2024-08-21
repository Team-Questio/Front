import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa"; // 사용자 이모티콘
import useAuth from "../../utils/useAuth"; // 로그인 상태 확인을 위한 커스텀 훅

const UserIcon = styled.div`
  position: relative;
  cursor: pointer;
`;

const DropdownMenu = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 150px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // 로그인 상태와 로그아웃 함수 가져오기
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleButtonClick = () => {
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    logout();
    setDropdownVisible(false);
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="logo" onClick={handleLogoClick}>
        Questio
      </div>

      {isAuthenticated ? (
        <UserIcon onClick={toggleDropdown}>
          <FaUserCircle size={30} />
          <DropdownMenu show={dropdownVisible}>
            <DropdownItem onClick={() => navigate("/profile")}>
              나의 정보
            </DropdownItem>
            <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
          </DropdownMenu>
        </UserIcon>
      ) : (
        <button className="start-button" onClick={handleButtonClick}>
          시작하기
        </button>
      )}
    </div>
  );
};

export default Header;
