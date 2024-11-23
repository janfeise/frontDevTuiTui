import React, { useEffect, useState } from "react";

import "./Label.css"
import "../../utilities.css"
/* 
* Proptypes
* @param {string} type 指定input框的类型：password......
* @param {string} defaultText 输入框的默认值
* @param {string} display label标签名：用户名？密码？
* @param {string} name 将数据传递给后端时必须指定name
* @param {string} value
* @param {(value) => {setValue}} onChange: 一个函数
* @param {string} errorMessage: 当账户名已被注册时（或者确认密码错误时）显示
* @param {sting} right: 判断账户是否已存在？两次输入的密码是否正确？不正确则显示错误信息
*/
const Label = (props) => {
    return (
        <div>
            <label className="u-flex u-flex-column u-fontFamily u-fontLargeSize u-fontSpacing Label">
                {props.display}
                <input type={props.type} name={props.name} placeholder={props.defaultText} 
                value={props.value} onChange={props.onChange} 
                className="Label-input u-width u-height u-border u-fontSize input-maxLength"/>
                <span className="errorMessage">{props.right}</span>
            </label>
        </div>
    );
};

/* 
* 实现登录框：父组件在login.js
*
* @param {string} value_user 当用户名输入框更改时，同步
* @param {string} value_password 当登录框密码更改时，同步
* @param {(value) => {setValue}} onChange: 同步state的函数，setState
*/
const Login = (props) => {
    return (
        <>
            <Label value={props.value_user} onChange={props.onUserChange}
            type={"text"} display={"账户"} name={"username"} defaultText={"请输入账户名"}></Label>
            <Label value={props.value_password} onChange={props.onPasswordChange}
            type={"password"} display={"密码"} name={"password"} defaultText={"请输入密码"}></Label>
        </>
    );
};

/* 
* 注册页面组件：账户框、密码框、确认密码框、邮箱框
*
* @param {string} account: 记录账户
* @param {string} password: 记录密码
* @param {string} confimPassword: 确认密码
* @param {string} email: 记录邮箱
* @param {string} accountExist: 判断账户是否存在，若为空则不显示
* @param {string} passwordRight: 判断两次输入的密码是否正确
* @param {(value) => {setValue}} onChange: 同步state的函数，setState
*/
const Register = (props) => {
    return (
        <>
            <Label value={props.account} onChange={props.handleAccount}
            type={"text"} display={"账户"} name={"username"} defaultText={"请输入用户名"}
            right={props.accountExist}
            />
            <Label value={props.password} onChange={props.handlePassword}
            type={"password"} display={"密码"} name={"password"} defaultText={"请输入密码"}
            right={props.passwordRight}
            />
            <Label value={props.confirmPassword} onChange={props.handleConfirmPassword}
            type={"password"} display={"确认密码"} name={"confirmPassword"} defaultText={"请再次输入密码"}
            right={props.passwordRight}
            />
            <Label value={props.email} onChange={props.handleEmail}
            type={"邮箱"} display={"输入邮箱"} name={"email"} defaultText={"请输入您的邮箱"}
            />
        </>
    );
};

export { Login, Register };

