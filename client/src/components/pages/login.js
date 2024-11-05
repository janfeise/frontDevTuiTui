import React, { useState } from 'react';
import { post } from "../../utilities.js";

const LoginComponent = () => {
    const [userAccount, setUserAccount] = useState('');
    const [password, setPassword] = useState('');

    const handleUserAccountChange = (event) => {
        setUserAccount(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginData = {
            userAccount,
            password,
        };

        post("/user/login", {userAccount, password})
        .then((res) => {
            console.log(res.code);
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userAccount">用户名:</label>
                <input
                    type="text"
                    id="userAccount"
                    value={userAccount}
                    onChange={handleUserAccountChange}
                />
            </div>
            <div>
                <label htmlFor="password">密码:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button type="submit">登录</button>
        </form>
    );
};

export default LoginComponent;
