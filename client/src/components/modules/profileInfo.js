/**
 * 个人信息组件
 *
 * 详情：个人中心页面的个人信息组件
 */
/* 导入react */
import React, { useState, useContext } from "react";

/* 导入全局状态管理的组件 */
import { GlobalStateProvider, GlobalContext } from "../context/AppContext";

/* 导入样式 */
import "./profileInfo.css";

export default function ProfileInfo() {
  // 使用 useContext 来获取全局状态
  const {
    userName,
    setUserName,
    userAccount,
    setUserAccount,
    userEmail,
    setUserEmail,
    userIdentity,
    setUserIdentity,
  } = useContext(GlobalContext);

  const getDisplayIdentity = (identity) => {
    switch (identity) {
      case "0":
        return "求职者";
      case "1":
        return "在职者";
      case "2":
        return "管理员";
      default:
        return "";
    }
  };

  const displayIdentity = getDisplayIdentity(userIdentity);

  return (
    <div className="profileInfo">
      <div className="profileInfo__box--title profile__underline">个人资料</div>
      <div className="profileInfo__box--main">
        <main>
          <div className="u-margin-bottom-small">
            <span className="profileInfo__title">账号</span>
            <span className="profileInfo__content profileInfo__account">
              {userAccount}
            </span>
          </div>
          <div className="u-margin-bottom-small">
            <span className="profileInfo__title">用户名</span>
            <input
              defaultValue={userName}
              className="profileInfo__content profileInfo__username"
            ></input>
          </div>
          <div className="u-margin-bottom-small">
            <span className="profileInfo__title">邮箱</span>
            <span className="profileInfo__content profileInfo__email">
              {userEmail}
            </span>
          </div>

          <div className="u-margin-bottom-small">
            <span className="profileInfo__title">身份</span>
            <span className="profileInfo__content profileInfo__account">
              {displayIdentity}
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
