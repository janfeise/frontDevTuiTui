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
  // 从 localStorage 获取 token
  const [TOKEN, setToken] = useState(() => !!localStorage.getItem("TuiTui"));

  /**
   * 用户身份：
   *      -1 表示第一次进入网站，未登录
   *       0 表示求职者
   *       1 表示在职者
   *       2 表示管理员
   */
  const [userIdentity, setUserIdentity] = useState(-1);

  /**
   * 用户名
   */
  const [userName, setUserName] = useState("");

  /**
   * 用户账号
   */
  const [userAccount, setUserAccount] = useState("");

  /**
   * 用户邮箱
   */
  const [userEmail, setUserEmail] = useState("");

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
            localStorage.removeItem("TuiTui");
            localStorage.removeItem("userIdentity");
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
  }, [TOKEN, userIdentity]);

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
