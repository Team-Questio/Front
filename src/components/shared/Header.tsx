import React from "react";

import { useNavigate } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleButtonClick}>
        Questio
      </div>
    </header>
  );
};

export default Header;
