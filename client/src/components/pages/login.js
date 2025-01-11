/**
 * 实现登录页面
 *
 * Proptypes: 父组件为App.js
 * @param {() => void} handleToken: 更新token的函数
 */

// 导入react
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

// 导入组件
import { Login } from "../modules/Label.js";
import { Button } from "../modules/Button.js";
import { LOGO } from "../modules/LOGO.js";
import { TextLinkTo } from "../modules/TextLinkTo.js";
import { Title } from "../modules/title.js";
import { POP } from "../modules/POP.js";
import { post } from "../../utilities.js";

// 导入：delay function
import { delay } from "../../utilities.js";

// 导入css
import "../../utilities.css";
import "./login.css";

/**
 * 实现登录页面
 *
 * Proptypes: 父组件为App.js
 * @param {() => void} handleToken: 更新token的函数
 */
const LoginPage = (props) => {
  // 记录账户和密码
  const [value_user, set_value_user] = useState(""); // 账户
  const [value_password, set_value_password] = useState(""); // 密码
  const [redirectToHome, setRedirectToHome] = useState(false); // 页面跳转
  const [errInfos, setErrInfos] = useState([]); // 存储多个错误信息，弹窗POP组件显示每个错误信息
  const [isloading, setLoading] = useState(false); // 点击登录按钮向后端发生请求时，显示加载项？

  // 更新value：用户名和密码
  const handleUserChange = (value) => {
    set_value_user(value);
  };
  const handlePasswordChange = (value) => {
    set_value_password(value);
  };

  // 进入页面时渲染title：
  useEffect(() => {
    document.title = "登录—TuiTui";
  }, []);

  // 定时器，定时清理错误信息errInfos
  var timer;
  useEffect(() => {
    const len = errInfos.length;
    if (len > 0) {
      timer = setTimeout(() => {
        setErrInfos((prev) => prev.slice(1));
      }, 1000 * 3);
    }

    return () => clearTimeout(timer); // 清除定时器，防止重复
  }, [errInfos]);

  /**
   * 处理用户点击登录按钮的操作。
   *
   * 功能描述：
   * 1. 检查用户账户和密码是否符合要求。
   *    - 使用辅助函数 `checkAccount` 检查账户合法性（不能为空）。
   *    - 使用辅助函数 `checkPassword` 检查密码合法性（不能为空）。
   * 2. 如果账户和密码检查通过，将数据发送到后端进行登录验证。
   * 3. 根据后端返回的结果：
   *    - 登录成功时，调用 `props.handleToken` 处理 token 并重定向到主页。
   *    - 登录失败时，更新错误信息显示。
   *
   * @function handleClick
   * @param {string} account - 用户名，不能为空。
   * @param {string} password - 密码，不能为空。
   * @returns {void} 没有返回值。
   *
   * @example
   * handleClick("username123", "password456");
   *
   * 辅助函数：
   * - `checkAccount(account)` 检查账户合法性。
   * - `checkPassword(account, password)` 检查密码合法性。
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

    // loading
    setLoading(true);

    // 发生请求
    post("/user/login", body).then((res) => {
      const { data, token } = res;
      // 登录成功
      if (data.code == "200") {
        // 显示登录成功
        const showSuccess = async () => {
          setErrInfos((prev) => [...prev, "登录成功！！！"]);
          await delay(1000);
          setErrInfos([]); // 清空错误信息

          // 页面跳转
          props.handleToken(token);
          setRedirectToHome(true);
        };
        showSuccess();
      } else {
        setErrInfos((prev) => [...prev, "密码错误！！！"]);
      }
    });
    // loading
    const handleLoadingFalse = async () => {
      await delay(500);
      setLoading(false);
    };
    handleLoadingFalse();
  };

  /**
   * handleClick()的辅助函数：账户检查是否为空，若为空则POP弹窗显示：账户不能为空
   *
   * @function checkAccount()
   * @param {string} account
   * @returns { boolean }
   *    - true: 账户不为空
   *    - false: 账户为空
   */
  const checkAccount = (account) => {
    if (account === "") {
      // 使用prev获取最新的state：errInfos的最新状态，并在末尾添加：“账户不能为空”
      setErrInfos((prev) => [...prev, "账户不能为空！！！"]);
      return false;
    }
    return true;
  };

  /**
   * handleClick()的辅助函数：检查密码是否为空，若为空则POP弹窗显示"请输入密码"
   *
   * @function checkPassword()
   * @param {string} account
   * @param {string} password
   * @returns { boolean }
   *    - true: 密码不为空
   *    - false: 密码为空
   */
  const checkPassword = (account, password) => {
    if (account && password === "") {
      // 使用prev获取最新的state：errInfos的最新状态，并在数组末尾添加：“密码不能为空”
      setErrInfos((prev) => [...prev, "请输入密码！！！"]);
      return false;
    }
    return true;
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
          <div
            className={`${isloading ? "loginButton loading" : "loginButton"}`}
          >
            <Button
              TEXT="登录"
              handleClick={handleClick}
              account={value_user}
              password={value_password}
              isloading={isloading}
            />
          </div>
          {/* 弹窗 */}
{/*           <POP
            key={`${errInfos.length - 1}`}
            className="u-viewCenter"
            errInfo={errInfos[errInfos.length - 1]}
          ></POP> */}
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
