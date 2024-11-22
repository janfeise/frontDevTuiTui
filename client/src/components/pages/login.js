import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Login } from "../modules/Label.js";
import { Button } from "../modules/Button.js";
import { LOGO } from "../modules/LOGO.js";
import { TextLinkTo } from "../modules/TextLinkTo.js";
import { Title } from "../modules/title.js";
import { POP } from "../modules/POP.js";

import { post } from "../../utilities.js";
import "../../utilities.css";
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
  const [errInfos, setErrInfos] = useState([]); // 存储多个错误信息

  var timer; // 定时器

  // 更新value：用户名和密码
  const handleUserChange = (event) => {
    set_value_user(event.target.value);
  };
  const handlePasswordChange = (event) => {
    set_value_password(event.target.value);
  };

  // 进入页面时渲染title：
  useEffect(() => {
    document.title = "登录—TuiTui";

    // 清除定时器
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  /*
   * 提交登录数据给后端
   * 1. 账户检查：账户不能为空
   * 2. 密码检查：密码不能为空
   */
  const handleClick = (account, password) => {
    // 账户检查: 返回false表示账户存在问题
    if (checkAccount(account) == false) {
      return;
    }
    // 密码检查：返回false表示密码存在问题
    if (checkPassword(account, password) == false) {
      return;
    }
    // 将用户名和密码post给后端
    const body = {
      password: password,
      userAccount: account,
    };

    post("/user/login", body).then((res) => {
      const { data, token } = res;
      // 登录成功
      if (data.code == "200") {
        props.handleToken(token);
        setRedirectToHome(true);
      } else {
        setErrInfos((prev) => [...prev, "密码错误！！！"]);
      }
    });
  };

  // 辅助函数：账户检查
  const checkAccount = (account) => {
    if (account === "") {
      // 使用prev获取最新的state：errInfos的最新状态，并在末尾添加：“账户不能为空”
      setErrInfos((prev) => [...prev, "账户不能为空！！！"]);
      clearErrInfo();
      return false;
    }
    return true;
  };

  // 辅助函数：密码检查
  const checkPassword = (account, password) => {
    if (account && password === "") {
      // 使用prev获取最新的state：errInfos的最新状态，并在数组末尾添加：“密码不能为空”
      setErrInfos((prev) => [...prev, "请输入密码！！！"]);
      clearErrInfo();
      return false;
    }
    return true;
  };

  // 辅助函数：定时清理第一个错误信息：0索引
  const clearErrInfo = () => {
    timer = setTimeout(() => {
      setErrInfos((prev) => prev.slice(1)); // 定时清除第一个错误信息: 0索引
    }, 1000 * 60);
  };

  return (
    <div className="u-flex u-flex-column u-flex-alignCenter u-backColor fullDiv">
      <div>
        <LOGO />
      </div>
      <div>
        <form className="u-flex u-flex-column u-flex-alignCenter login-form">
          <Title display="登录" />
          <Login
            value_user={value_user}
            value_password={value_password}
            onUserChange={handleUserChange}
            onPasswordChange={handlePasswordChange}
            className="Login"
          />
          <Button
            TEXT="登录"
            handleClick={handleClick}
            account={value_user}
            password={value_password}
          />
          {/* 弹窗 */}
          {errInfos.map((info, index) => (
            <POP key={index} className="u-viewCenter" errInfo={info} />
          ))}
          {/* 跳转注册页面 */}
          <div className="toLogin">
            <span className="u-bold">新用户？</span>
            <Link to="/register">
              <TextLinkTo content="马上注册" />
            </Link>
          </div>
        </form>
      </div>
      {/* 如果登录成功，则跳转主页 */}
      {redirectToHome && <Navigate to="/" />}
    </div>
  );
};

export default LoginPage;
