import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useId,
} from "react";
import { get } from "../../utilities";

// 创建全局状态
const GlobalContext = createContext();

// 全局状态提供者组件
const GlobalStateProvider = ({ children }) => {
  // 从 localStorage 初始化 TOKEN
  const [TOKEN, _setToken] = useState(
    () => localStorage.getItem("TuiTui") !== null
  );

  // 封装 setToken 以同步 localStorage
  const setToken = (token) => {
    if (token) {
      localStorage.setItem("TuiTui", token);
    } else {
      localStorage.removeItem("TuiTui");
    }
    _setToken(!!token);
  };

  // 从 localStorage 初始化用户状态

  /**
   * 用户身份：
   *      -1 表示第一次进入网站，未登录
   *       0 表示求职者
   *       1 表示在职者
   *       2 表示管理员
   */
  const [userIdentity, setUserIdentity] = useState(() => {
    const saved = localStorage.getItem("userIdentity");
    return saved !== null ? parseInt(saved, 10) : "-1";
  });

  /**
   * 用户名
   */
  const [userName, setUserName] = useState(
    () => localStorage.getItem("userName") || ""
  );

  /**
   * 用户账号
   */
  const [userAccount, setUserAccount] = useState(
    () => localStorage.getItem("userAccount") || ""
  );

  /**
   * 用户邮箱
   */
  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem("userEmail") || ""
  );

  // 监听状态变化并同步到 localStorage
  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    }
  }, [userName]);

  useEffect(() => {
    if (userAccount) {
      localStorage.setItem("userAccount", userAccount);
    }
  }, [userAccount]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    }
  }, [userEmail]);

  // 当 TOKEN 和 userIdentity 变化时，获取用户身份
  useEffect(() => {
    if (TOKEN) {
      const params = {
        token: localStorage.getItem("TuiTui"),
      };
      get("/user/verify", params)
        .then((res) => {
          if (res && res.code === 200) {
            localStorage.setItem("userIdentity", res.data);
            setUserIdentity(res.data);
          } else {
            // TOKEN 无效时清除数据
            setToken(null);
            setUserIdentity(-1);
            setUserName("");
            setUserAccount("");
            setUserEmail("");
            localStorage.removeItem("TuiTui");
            localStorage.removeItem("userIdentity");
            localStorage.removeItem("userName");
            localStorage.removeItem("userAccount");
            localStorage.removeItem("userEmail");
            console.log("请求失败或无响应");
            // 刷新页面
            window.location.reload(); // 强制刷新
            alert("TOKEN错误！！！");
          }
        })
        .catch((error) => {
          console.log("请求失败:", error);
        });
    } else {
      setUserIdentity(-1);
    }
  }, [TOKEN, userIdentity, userAccount, userEmail, userName]);

  return (
    <GlobalContext.Provider
      value={{
        TOKEN,
        setToken,
        userIdentity,
        setUserIdentity,
        userName,
        setUserName,
        userAccount,
        setUserAccount,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalStateProvider };
