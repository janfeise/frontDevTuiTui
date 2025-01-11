import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

/* 导入组件 */
import NavBar from "./modules/NavBar"; // 导航栏组件
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import WorkPage from "./pages/WorkPage";

import "../utilities.css";

const App = () => {
  // 从浏览器获取token
  const [TOKEN, setToken] = useState(!!localStorage.getItem("TuiTui"));

  return (
    <Router>
      <AppWithRouter TOKEN={TOKEN} setToken={setToken} />
    </Router>
  );
};

const AppWithRouter = ({ TOKEN, setToken }) => {
  // 获取当前路由路径
  const location = useLocation();

  // 更新token
  const handleToken = (newToken) => {
    // 将token存储到本地浏览器
    localStorage.setItem("TuiTui", newToken);
    setToken(newToken);
  };

  // 登出功能：清除本地浏览器存储的token，然后刷新页面
  const handleLogout = () => {
    // 清除本地存储中的 token
    localStorage.removeItem("TuiTui");

    // 清除当前状态中的 token
    setToken(false);

    // 刷新页面
    window.location.reload();
  };

  return (
    <div>
      {/* 判断当前路径，如果不是登录页面或注册页面则渲染导航栏 */}
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <NavBar handleLogout={handleLogout} />
      )}

      <Routes>
        {/* 主页，如果没有token则跳转登录页面 */}
        <Route
          path="/"
          element={TOKEN ? <HomePage /> : <Navigate to={"/login"} />}
        />
        {/* 找工作页面 */}
        <Route
          path="/findJob"
          element={
            TOKEN ? (
              <WorkPage handleLogout={handleLogout} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        {/* 登录页面：传递回调函数，更新token */}
        <Route
          path="/login"
          element={
            TOKEN ? (
              <Navigate to={"/"} />
            ) : (
              <LoginPage handleToken={handleToken} />
            )
          }
        />
        {/* 注册页面 */}
        <Route
          path="register"
          element={TOKEN ? <Navigate to={"/"} /> : <RegisterPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
