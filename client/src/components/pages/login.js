import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Login } from '../modules/Label.js';
import { Button } from '../modules/Button.js';
import { LOGO } from '../modules/LOGO.js';
import { TextLinkTo } from '../modules/TextLinkTo.js';
import { Title } from "../modules/title.js";

import { post } from "../../utilities.js";
import "../../utilities.css"
import "./login.css";

/* 
* 实现登录页面
*
* Proptypes
* @param {() => void} handleToken: 更新token的函数
*/

const LoginPage = (props) => {
    // 记录账户和密码
    const [value_user, set_value_user] = useState("");
    const [value_password, set_value_password] = useState("");
    const [redirectToHome, setRedirectToHome] = useState(false); // 页面跳转

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
        const body = {
            "password": password,
            "userAccount": account 
        }

        // 将后端返回的token存储起来，props.handleToken，如果登录成功返回主页
        post("/user/login", body).then(response => {
            // 1. 从Headers获取token
            // 获取 Authorization 头
            const authorizationHeader = response.headers.get('Authorization');
            
            if (authorizationHeader) {
                // 提取 Bearer token
                const token = authorizationHeader.split(' ')[1]; // 分割出 token 部分
                
                // 2. 更新token
                props.handleToken(token);

                // 3. 跳转主页
                setRedirectToHome(true); // 设置跳转标志为 true
            } 
            else 
            {
                alert("登录失败，请检查用户名和密码");
            }
        });
    };

    useEffect(() => {
        if (redirectToHome) {
            return <Navigate to="/" />;
        }
    }, [ redirectToHome ]);
    

    return (
        <div className='u-flex u-flex-column u-flex-alignCenter u-backColor fullDiv'>
            <div>
                <LOGO />
            </div>
            <div>
                <form className="u-flex u-flex-column u-flex-alignCenter login-form">
                    <Title display="登录"/>
                        <Login value_user={value_user} value_password={value_password} 
                            onUserChange={handleUserChange}
                            onPasswordChange={handlePasswordChange} 
                            className="Login"/>
                        <Button 
                        TEXT="登录" 
                        handleClick={handleClick} 
                        account={value_user} 
                        password={value_password} />
                    {/* 跳转注册页面 */}
                    <div className='toLogin'>
                        <span className="u-bold">新用户？</span>
                        <Link to="/register">
                            <TextLinkTo content="马上注册" />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
