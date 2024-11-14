import React, { useState } from "react";

import "./Label.css"
/* 
* Proptypes
* @param {string} type 指定input框的类型：password......
* @param {string} defaultText 输入框的默认值
* @param {string} display label标签名：用户名？密码？
* @param {string} name 将数据传递给后端时必须指定name
* @param {string} value
* @param {(value) => {setValue}} onChange: 一个函数
*/
const Label = (props) => {
    const [value, setValue] = useState(""); // value存储用户在input框的输入内容

    return (
        <>
            <label>
                {props.display}<br />
                <input type={props.type} name={props.name} placeholder={props.defaultText} 
                value={props.value} onChange={props.onChange} 
                className="Label-input"/>
            </label>
        </>
    );
};

/* 
* 实现登录框：父组件在login.js
*
* @param {string} value_user 当用户名输入框更改时，同步
* @param {string} value_password 当登录框密码更改时，同步
* @param {(value) => {setValue}} onChange: 一个函数
*/
const Login = (props) => {
    return (
        <>
            <Label value={props.value_user} onChange={props.onUserChange}
            type={"text"} display={"账户"} name={"username"}></Label>
            <Label value={props.value_password} onChange={props.onPasswordChange}
            type={"password"} display={"密码"} name="password"></Label>
        </>
    );
};

export { Login };