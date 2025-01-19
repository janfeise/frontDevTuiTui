import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 获取根元素并创建 Root
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// 渲染 App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
