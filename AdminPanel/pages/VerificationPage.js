import React, { useState } from "react";
import axios from "axios";
import "./VerificationPage.css";
const VerificationPage = ({ onVerified }) => {
    const [code, setCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await axios.get(
                `http://qms198.online:8088/user/verify/code?code=${code}`
            );
            if (response.data.code === 200) {
                onVerified(true);  // 验证成功，进入主页面
            } else {
                setErrorMessage("验证码错误，请重试");
            }
        } catch (error) {
            setErrorMessage("请求失败，请稍后再试");
        }
    };

    return (
        <div className="verification-page">
            <h2>你正在进入管理系统，请输入动态验证码</h2>
            <input
                type="text"
                placeholder="请输入验证码"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleSubmit}>验证</button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
};

export default VerificationPage;
