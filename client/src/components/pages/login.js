import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Login } from '../modules/Label.js';
import { Button } from '../modules/Button.js';
import { LOGO } from '../modules/LOGO.js';
import { TextLinkTo } from '../modules/TextLinkTo.js';
import { register } from './register.js';

import { post } from "../../utilities.js";
import "../../utilities.css"
import "./login.css";

const LoginComponent = () => {
    // 记录账户和密码
    const [value_user, set_value_user] = useState("");
    const [value_password, set_value_password] = useState("");

    // 更新value：用户名和密码
    const handleUserChange = (event) => {
        set_value_user(event.target.value);
    };
    const handlePasswordChange = (event) => {
        set_value_password(event.target.value);
    };

    // 渲染title：
    useEffect(() => {
        document.title = "登录—TuiTui";
    }, []);

    // 提交登录数据给后端
    const handleClick = (account, password) => {
        console.log("用户名：" + account);
        console.log("密码：" + password);
    };

    return (
        <div className='u-flex u-flex-column u-flex-alignCenter u-flex-justifyCenter full-div'>
            <LOGO />
            <form className="u-flex u-flex-column u-flex-alignCenter  login-form">
                <div className="u-flex u-flex-column u-flex-alignCenter">
                    <p className='u-fontLargeSpacing u-fontFamily'>登录</p>
                    <Login value_user={value_user} value_password={value_password} 
                        onUserChange={handleUserChange}
                        onPasswordChange={handlePasswordChange} 
                        className="Login"/>
                    <Button TEXT="登录" handleClick={handleClick} account={value_user} password={value_password} />
                </div>
                {/* 跳转注册页面 */}
                <div className='u-bold register'>
                    <span className="u-bold">新用户？</span>
                    <TextLinkTo content="马上注册" />
                </div>
            </form>
        </div>
    );
};

export default LoginComponent;
