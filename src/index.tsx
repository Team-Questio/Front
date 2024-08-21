import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      theme="colored" // 테마 설정 ("light", "dark", "colored")
    />
  </React.StrictMode>
);
