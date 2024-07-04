import React from 'react';
import { CgDarkMode } from "react-icons/cg";

import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/')
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleButtonClick}>Questio</div>
      <button onClick={toggleDarkMode} className="mode-toggle">
        <CgDarkMode />
      </button>
    </header>
  );
};

export default Header;