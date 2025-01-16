/**
 * 注册页面
 */

// 导入react
import React, { useState, useEffect, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";

// 导入组件
import { Register } from "../modules/Label";
import { LOGO } from "../modules/LOGO";
import { Button } from "../modules/Button";
import { TextLinkTo } from "../modules/TextLinkTo";
import { Title } from "../modules/title";
import { Identity } from "../modules/Identity";
import { POP } from "../modules/POP.js";

// 导入delay function
import { delay } from "../../utilities.js";

// 导入css
import "./register.css";

// 导入请求
import { post, get } from "../../utilities.js";

/**
 * 实现注册页面
 */
const RegisterPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [identity, setIdentity] = useState("1"); // 身份：0表示在职者，1表示求职者
  const [accountExist, setAccountExist] = useState(""); // 判断账户是否存在
  const [passwordRight, setPasswordRight] = useState(""); // 判断输入的两次密码是否一致
  const [emailRight, setEmailRight] = useState("");
  const [isFirstRender, setFirstRender] = useState(true); // 判断是否第一次渲染，如果是第一次渲染则不检查账户是否为空
  const [errInfos, setErrInfos] = useState([]); // 存储多个错误信息，弹窗POP组件显示每个错误信息
  const [redirectToLogin, setRedirectToLogin] = useState(false); // 注册成功跳转登录页面
  const [isloading, setIsloading] = useState(false); // 点击注册按钮向后端发生请求时，显示加载项？

  // 正则: 判断用户输入是否符合条件
  // 1. 账户：8-12位数字
  const accountRegex = /^\d{8,12}$/;
  // 2. 密码：6-12位
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>_+-=]{6,12}$/;
  // 3. 邮箱
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    document.title = "注册—TuiTui"; // 更新网页的title
  }, []);

  // 处理account更改
  const handleAccount = useCallback((value) => {
    setAccount(value);
  }, []);

  // 处理密码更改
  const handlePassword = (value) => {
    setPassword(value);
  };

  // 处理确认密码
  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  // 处理邮箱更改
  const handleEmail = (value) => {
    setEmail(value);
  };

  // 处理身份选择
  const handleIdentity = () => {
    setIdentity(identity == "1" ? "0" : "1"); // 虽然setStatues是异步的，但是返回的不是promise
  };

  // 定时器: 错误信息显示
  var timer;
  // 定时清理第一个错误信息，防止错误信息一直累积
  useEffect(() => {
    const length = errInfos.length;
    if (length > 0) {
      timer = setTimeout(() => {
        setErrInfos((prev) => prev.slice(1));
      }, 1000 * 3);
    }

    return () => clearTimeout(timer); // 清除定时器，防止多个定时器
  }, [errInfos]);

  /**
   * 实时检测账户是否已存在: 若存在则以红色的字体提醒用户：账户已存在
   */
  useEffect(() => {
    // 1. 检查用户输入的账户是否合法
    // 第一次进入时无需判断
    if (isFirstRender === true) {
      setFirstRender(false);
      return;
    }
    console.log("accout" + account);
    checkAccount();
  }, [account]);

  /* 检查两次输入的密码是否相同 */
  useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
      return;
    }
    checkPassword();
  }, [password, confirmPassword]);

  /* 检查邮箱格式是否正确 */
  useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
      return;
    }
    checkEmail();
  }, [email]);

  /**
   * 处理用户点击注册按钮的操作
   *
   * 功能描述：
   * 1. 检查用户的注册页面表单数据是否正确填写
   *    - 使用辅助函数`check()`检查注册页面表单数据
   *        - 辅助函数`check()`由多个辅助函数：checkAccount()，checkPassword()，checkEmail()组成
   * 2. 如果注册页面表单数据检查通过，将数据发送给后端
   * 3. 根据后端的返回结果：
   *    - 注册成功时：跳转登录页面
   *    - 注册失败时：弹窗显示注册失败
   *
   * @function handleSubmit
   */
  const handleSubmit = async () => {
    /**
     * 因为check是异步函数：使用了get请求
     * 因此不能直接：check() == false
     */
    // 首先效验用户提交的数据是否合法
    const isValid = await check();
    if (isValid === false) {
      return;
    }

    // loading
    setIsloading(true);

    const body = {
      userAccount: account,
      userName: "test",
      password: password,
      confirmedPassword: confirmPassword,
      email: email,
      userIdentity: identity,
    };

    post("/user/register", body).then((res) => {
      const { data } = res;
      //登录成功跳转登录页面
      if (data.code == "200") {
        const showSuccess = async () => {
          setErrInfos((prev) => [...prev, "注册成功！！！"]);
          await delay(1000);
          // 跳转登录页面
          setRedirectToLogin(true);
          // 清空错误信息
          setErrInfos([]);
        };
        showSuccess();
      } else {
        setErrInfos((prev) => [...prev, "注册失败！！！"]);
      }
    });

    // loading
    const handleLoadingFalse = async () => {
      await delay(500);
      setIsloading(false);
    };
  };

  /**
   * handleSubmit的辅助函数
   *
   * 功能：
   * 1. 账户：检查账户是否合法：8-12位纯数字，账户是否已存在？
   *    - 辅助函数：checkAccout
   * 2. 密码：密码是否合法：6-12为，两次密码是否相同？
   *    - 辅助函数：checkPassword
   * 3. 邮箱：邮箱格式是否正确
   *    - 辅助函数：checkEmail
   *
   * @function check
   * @returns { boolean }
   *   - true: 用户正确填写所有注册页面
   *   - false: 用户没有正确填写注册页面
   */
  // 因为checkAccout()是异步的请求：get，因此需要结合async和await
  const check = async () => {
    /* 检测账户是否合法 */
    if ((await checkAccount()) == false) {
      setErrInfos((prev) => [...prev, "账户不合法！！！"]);
      return false;
    }
    /* 密码检查 */
    // 1. 密码为空
    if (password === "" && confirmPassword === "") {
      setPasswordRight("请输入密码");
      return false;
    }
    if (password === "" && confirmPassword !== "") {
      setErrInfos((prev) => [...prev, "请检查密码是否输入！！！"]);
      return false;
    }
    if (password !== "" && confirmPassword === "") {
      setErrInfos((prev) => [...prev, "请检查确认密码是否输入！！！"]);
      return false;
    }
    // 2. 密码合法性
    if (password !== "" && confirmPassword !== "") {
      if (checkPassword() === false) {
        setErrInfos((prev) => [...prev, "密码不合法！！！"]);
        return false;
      }
    }
    /* 检查邮箱是否合法 */
    if (email === "") {
      setEmailRight("请输入您的邮箱！！！");
      setErrInfos((prev) => [...prev, "请输入您的邮箱！！！"]);
      return false;
    }
    if (checkEmail() === false) {
      setErrInfos((prev) => [...prev, "邮箱格式错误"]);
      return false;
    }
    return true;
  };

  /**
   * check的辅助函数：判断账户是否合法，账户是否已被注册
   *
   * @function checkAccount()
   * @returns { boolean }
   *    -true: 账户没有被注册
   *    -false: 账户已被注册，该账户名不可使用；或者，账户不合法
   */
  const checkAccount = () => {
    // 1. 检查账户合法性：账户必须是8-12位数字
    // 匹配失败：返回false，即不符合要求
    if (account == "") {
      setAccountExist("请输入您的账户");
      return false;
    } else if (accountRegex.test(account) === false) {
      setAccountExist("账户必须是8到12位的数字");
      return false;
    }

    // 效验完毕：实时将账户传递给后端
    const params = {
      userAccount: account,
    };
    // 因为get是异步的，而return是同步的，需结合async
    return get(`/user/userAccount`, params).then((res) => {
      // 若后端返回code: 500，则账户已被注册
      //   账户已被注册
      if (res.code == "200") {
        setAccountExist("账户已存在");
        return false;
      } else {
        setAccountExist("");
        return true;
      }
    });
  };

  /**
   * check的辅助函数: 判断密码是否合法
   * 只有在提交时才检查密码是否为空
   *
   * @function checkPassword
   * @returns { boolean }
   *    - true: 密码合法
   *    - false: 密码非法
   */
  const checkPassword = () => {
    // 检查密码合法性
    // 只有在提交时才检查密码是否为空
    if (password === "" && confirmPassword === "") {
      setPasswordRight("");
      return false;
    } else if (password !== "" && confirmPassword === "") {
      setPasswordRight("");
      return false;
    } else if (password === "" && confirmPassword !== "") {
      setPasswordRight("");
      return false;
    }
    // 1. 两次输入的密码不相同
    else if (password !== confirmPassword) {
      setPasswordRight("两次输入的密码不同");
      return false;
    }
    // 2. 检查密码是否合法：此时两次输入的密码不为空且相同
    else {
      if (passwordRegex.test(password) === false) {
        // 密码不合法
        // 1. 判断长度是否在：6-12之间
        const lengthRegex = /^.{8,12}$/; // 长度限制
        const allowedCharsRegex = /^[a-zA-Z0-9!@#$%^&*(),.?:{}|<>_+=]+$/;
        if (lengthRegex.test(password) === false) {
          setPasswordRight("密码需设置6-12位");
          return false;
        }
        // 2. 长度合理：判断是否使用了不运行的字符
        else if (allowedCharsRegex.test(password) === false) {
          setPasswordRight("密码只能包含字母、数字和常见字符");
          return false;
        }
        return false;
      }
      setPasswordRight("");
      return true;
    }
  };

  /**
   * check的辅助函数：判断邮箱格式是否正确
   *
   * @function checkEmail
   * @returns { boolean }
   *    - true: 邮箱格式正确
   *    - false: 邮箱格式错误
   */
  const checkEmail = () => {
    if (email === "") {
      setEmailRight("");
      return false;
    } else if (emailRegex.test(email) === false) {
      setEmailRight("邮箱格式错误");
      return false;
    }
    setEmailRight("");
    return true;
  };

  return (
    <div className="u-flex u-flex-column u-flex-alignCenter u-backColor">
      <div>
        <LOGO />
      </div>
      <div>
        <form
          className="u-flex u-flex-column u-flex-alignCenter register-form"
          onSubmit={(event) => handleClick(event, value_user, value_password)}
        >
          <Title display="注册" />
          <Register
            handleAccount={handleAccount}
            accountExist={accountExist}
            handlePassword={handlePassword}
            passwordRight={passwordRight}
            emailRight={emailRight}
            handleConfirmPassword={handleConfirmPassword}
            email={email}
            handleEmail={handleEmail}
          />
          <Identity identity={identity} onChange={handleIdentity} />
          <div className={`${isloading ? "registerButton loading" : "registerButton"}`}>
            <Button
              handleClick={handleSubmit}
              TEXT={"注册"}
              type="submit"
              isloading={isloading}
            />
          </div>
          {/* 弹窗 */}
          {errInfos.map((info, index) => (
            <POP key={index} errInfo={info} className="u-viewCenter" />
          ))}
          <div className="toLog">
            <span>已有账户？</span>
            <Link to="/login">
              <TextLinkTo content="立即登录" />
            </Link>
          </div>
        </form>
      </div>
      {/* 如果注册成功，则跳转登录页面 */}
      {redirectToLogin && <Navigate to="/login" state={{ account: account }} />}
    </div>
  );
};

export default RegisterPage;
