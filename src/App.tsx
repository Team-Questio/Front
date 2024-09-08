import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  user-select: none; 
  -webkit-user-drag: none; 
  -webkit-touch-callout: none;
  -webkit-user-select: none; 
  -moz-user-select: none; 
  -ms-user-select: none; 
  user-select: none; 
}
  img {
  pointer-events: none;
}
html,
body {
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
  color: hsl(0, 0%, 100%);
  display: flex;
  justify-content: center;
  align-items: center;
   overflow: hidden; 
}

#root {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

body {
  display: flex;
  flex-direction: column;
  width: 100%;
}
`;

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppRoutes />
    </Router>
  );
};

export default App;
