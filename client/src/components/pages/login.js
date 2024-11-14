import React, { useEffect, useState } from 'react';
import { Login } from '../modules/Label.js';
import Logo from '../../images/Logo.png';

import { post } from "../../utilities.js";
import "../../utilities.css"
import "./login.css"

const LoginComponent = () => {
    const [value_user, set_value_user] = useState("");
    const [value_password, set_value_password] = useState("");
    // 记录选择：在职者？求职者？
    const [ choice, set_choice] = useState("false");

    // 更新value：用户名和密码
    const handleUserChange = (event) => {
        set_value_user(event.target.value);
    };
    const handlePasswordChange = (event) => {
        set_value_password(event.target.value);
    };

    // 更新用户的选择：在职者？求职者？
    const handleChoiceChange = (event) => {
        set_choice(event.target.value);
    };

    // 渲染title：
    useEffect(() => {
        document.title = "登录—TuiTui";
    }, []);

    // 提交登录数据给后端
    const handleClick = () => {
        console.log("用户名：" + value_user);
        console.log("密码：" + value_password);
        console.log("身份：" + choice);
    };

    return (
        <div className='u-flex u-flex-alignCenter u-flex-justifyCenter full-div'>
            <form className="u-flex u-flex-column u-flex-alignCenter u-flex-justifyCenter login-form u-fontSize">
                <img src={Logo} alt='Logo' className='img-logo'/>
                <div className="u-flex u-flex-column u-flex-alignCenter u-fontSize login-div">
                    <p>登录</p>
                    <Login value_user={value_user} value_password={value_password} 
                        onUserChange={handleUserChange}
                        onPasswordChange={handlePasswordChange} 
                        className="Loing"/>
                    <div>
                        <p>关于您自己</p>
                        <label>
                            <input type="radio" name="choice" value="true" checked={choice === "true"}
                            onChange={handleChoiceChange}
                            /> 在职者
                        </label>
                        <label>
                            <input type="radio" name="choice" value="false" checked={choice === "false"} 
                            onChange={handleChoiceChange}
                            /> 求职者
                        </label>
                    </div>
                    <button type="submit" onClick={handleClick}>登录</button>
                </div>
        </form>
        </div>
    );
};

export default LoginComponent;
