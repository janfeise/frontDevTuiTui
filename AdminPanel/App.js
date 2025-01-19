import React, { useState } from "react";
import RecruitmentQuery from "./pages/RecruitmentQuery";
import UserManagement from "./pages/UserManagement";
import TagManagement from "./pages/TagManagement"; // 引入标签管理页面
import VerificationPage from "./pages/VerificationPage"; // 引入验证码验证页面
import './App.css'; // 定义全局样式
import LOGO from "./pic.png";

const AdminPanel = () => {
    const [currentPage, setCurrentPage] = useState("RecruitmentQuery");
    const [isVerified, setIsVerified] = useState(false);  // 新增状态，标记验证码是否通过

    const renderPage = () => {
        switch (currentPage) {
            case "RecruitmentQuery":
                return <RecruitmentQuery />;
            case "UserManagement":
                return <UserManagement />;
            case "TagManagement":
                return <TagManagement />;
            default:
                return <RecruitmentQuery />;
        }
    };

    if (!isVerified) {
        return <VerificationPage onVerified={setIsVerified} />;
    }

    return (
        <div className="App">
            <header className="app-header">
                <h1>后台管理系统</h1>
                <div className="user-profile">
                    <img src={LOGO} alt="Logo"
                        style={{ width: "70px" }}
                    />
                    <div className="dropdown">
                        <button className="logout-button">登出</button>
                    </div>
                </div>
            </header>
            <nav className="navbar">
                <ul>
                    <li
                        className={currentPage === "RecruitmentQuery" ? "active" : ""}
                        onClick={() => setCurrentPage("RecruitmentQuery")}
                    >
                        招聘信息审核
                    </li>
                    <li
                        className={currentPage === "UserManagement" ? "active" : ""}
                        onClick={() => setCurrentPage("UserManagement")}
                    >
                        用户管理
                    </li>
                    <li
                        className={currentPage === "TagManagement" ? "active" : ""}
                        onClick={() => setCurrentPage("TagManagement")}
                    >
                        标签管理
                    </li>
                </ul>
            </nav>
            <div className="page-content">
                {renderPage()}
            </div>
        </div>
    );
};

export default AdminPanel;
