import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

/* 导入全局状态管理的组件 */
import { GlobalStateProvider, GlobalContext } from "./context/AppContext";

/* 导入后台管理系统 */
import AdminPanel from "../../../AdminPanel/App";

/* 导入组件 */
import NavBar from "./modules/NavBar"; // 导航栏组件
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import WorkPage from "./pages/WorkPage";
import Footer from "./modules/Footer";
import Profile from "./pages/profile";
import JobCircle from "./pages/JobCircle";

import "../utilities.css";

const App = () => {
  return (
    <Router>
      <GlobalStateProvider>
        <AppWithRouter />
      </GlobalStateProvider>
    </Router>
  );
};

const AppWithRouter = () => {
  // 使用 useContext 来获取全局状态
  const { TOKEN, setToken, userIdentity, setUserIdentity } =
    useContext(GlobalContext);

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
    localStorage.removeItem("userIdentity");
    localStorage.removeItem("userName");
    localStorage.removeItem("userAccount");
    localStorage.removeItem("userEmail");

    // 清除当前状态中的 token
    setToken(false);

    // 刷新页面
    window.location.reload();
  };

  return (
    <>
      {userIdentity !== "2" ? (
        <>
          {/* 判断当前路径，如果不是登录页面或注册页面则渲染导航栏 */}
          {location.pathname !== "/login" &&
            location.pathname !== "/register" && (
              <>
                <NavBar handleLogout={handleLogout} />
              </>
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
                  <LoginPage
                    handleToken={handleToken}
                    setUserIdentity={setUserIdentity}
                  />
                )
              }
            />
            {/* 注册页面 */}
            <Route
              path="register"
              element={TOKEN ? <Navigate to={"/"} /> : <RegisterPage />}
            />
            {/* 个人中心 */}
            <Route
              path="userSpace"
              element={TOKEN ? <Profile /> : <Navigate to={"/"} />}
            />

            {/* 招聘圈 */}
            <Route
              path="/JobCircle"
              element={TOKEN ? <JobCircle /> : <Navigate to={"/"} />}
            />
          </Routes>
        </>
      ) : (
        <AdminPanel></AdminPanel>
      )}

      <Footer />
    </>
  );
};

export default App;
