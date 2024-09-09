import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa"; // 사용자 이모티콘
import useAuth from "../../api/useAuth"; // 로그인 상태 확인을 위한 커스텀 훅
import { useAppDispatch } from "../../redux/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchUser } from "../../redux/user/userSlice";

// Styled Components
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f2937;
  box-sizing: border-box;
  padding-right: 20px;
  padding-left: 15px;
  height: 70px; /* 헤더의 높이 */
  z-index: 1000; /* 다른 요소 위에 표시 */
`;

const Logo = styled.img`
  height: 50px;
`;

const LogoDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const StartButton = styled.button`
  padding: 8pt 20pt;
  font-size: 18px;
  background-color: #2d3748;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3c4960;
  }
`;

const UserIcon = styled.div`
  position: relative;
  cursor: pointer;
  color: white;
`;

const DropdownMenu = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "block" : "none")};
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 200px;
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // 로그인 상태와 로그아웃 함수 가져오기
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { userEmail } = useSelector((state: RootState) => state.user);

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

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <HeaderContainer>
      <LogoDiv onClick={handleLogoClick}>
        <Logo src="/img/logo.svg" alt="questio" />
      </LogoDiv>

      {isAuthenticated ? (
        <UserIcon onClick={toggleDropdown}>
          <FaUserCircle size={30} />
          <DropdownMenu $show={dropdownVisible}>
            <DropdownItem>계정 정보 : {userEmail}</DropdownItem>
            <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
          </DropdownMenu>
        </UserIcon>
      ) : (
        <UserIcon onClick={handleButtonClick}>
          <FaUserCircle size={30} />
        </UserIcon>
      )}
    </HeaderContainer>
  );
};

export default Header;
