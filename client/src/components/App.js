import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavBar from './modules/NavBar';
import LoginPage from './pages/login';
import { RegisterPage } from './pages/register';
import HomePage from './pages/home';

import "../utilities.css"

const App = () => {
    // 从浏览器获取token
    const [ TOKEN, setToken ] = useState(!!localStorage.getItem("token"));

    // 更新token
    const handleToken = (newToken) => {
        // 将token存储到本地浏览器
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    return (
        <div>
            <Router>
                <Routes>
                    {/* 主页，如果没有token则跳转登录页面 */}
                    <Route 
                        path="/" 
                        element={TOKEN ? <HomePage /> : <Navigate to={"/login"} />} />
                    {/* 登录页面：传递回调函数，更新token */}
                    <Route 
                        path="/login" 
                        element={<LoginPage handleToken={handleToken} />} />
                    {/* 注册页面 */}
                    <Route 
                        path="register" 
                        element={<RegisterPage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
