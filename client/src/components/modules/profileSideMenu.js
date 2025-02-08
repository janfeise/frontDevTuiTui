/**
 * 个人中心页面的左侧菜单栏
 */
/* 导入react */
import React, { useState, useEffect, useContext } from "react";

/* 导入全局状态管理的组件 */
import { GlobalStateProvider, GlobalContext } from "../context/AppContext";

/* 导入样式 */
import "./profileSideMenu.css";

/**
 *
 *
 * @param {string} activeComponent 当前activeComonent
 * @param {Function} handleClick 点击菜单选项时，改变对应的activeComponent
 */
export default function ProfileSideMenu(props) {
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

  const [publishJob, setPublishJob] = useState(() => userIdentity === "1");

  useEffect(() => {
    setPublishJob(() => userIdentity === "1");
  }, [userIdentity]);

  return (
    <div className="u-flex u-flex-column u-flex-alignCenter profileSideMenu">
      {/* 用户头像 */}
      <div className="profileSideMenu__userAvatarContainer">
        <svg
          t="1737773199939"
          className="profileSideMenu__userAvatar"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4242"
        >
          <path
            d="M956.696128 512.75827c0 245.270123-199.054545 444.137403-444.615287 444.137403-245.538229 0-444.522166-198.868303-444.522166-444.137403 0-188.264804 117.181863-349.108073 282.675034-413.747255 50.002834-20.171412 104.631012-31.311123 161.858388-31.311123 57.297984 0 111.87909 11.128455 161.928996 31.311123C839.504032 163.650197 956.696128 324.494489 956.696128 512.75827L956.696128 512.75827M341.214289 419.091984c0 74.846662 38.349423 139.64855 94.097098 171.367973 23.119557 13.155624 49.151443 20.742417 76.769454 20.742417 26.64894 0 51.773154-7.096628 74.286913-19.355837 57.06467-31.113625 96.650247-96.707552 96.650247-172.742273 0-105.867166-76.664054-192.039781-170.936137-192.039781C417.867086 227.053226 341.214289 313.226864 341.214289 419.091984L341.214289 419.091984M513.886977 928.114163c129.883139 0 245.746984-59.732429 321.688583-153.211451-8.971325-73.739445-80.824817-136.51314-182.517917-167.825286-38.407752 34.55091-87.478354 55.340399-140.989081 55.340399-54.698786 0-104.770182-21.907962-143.55144-57.96211-98.921987 28.234041-171.379229 85.823668-188.368158 154.831344C255.507278 861.657588 376.965537 928.114163 513.886977 928.114163L513.886977 928.114163M513.886977 928.114163 513.886977 928.114163z"
            fill="#272636"
            p-id="4243"
          ></path>
        </svg>
      </div>

      {/* 用户名 */}
      <div className="profileSideMenu__userName">{userName}</div>

      {/* 账号 */}
      <div className="profileSideMenu__userAccount">账号：{userAccount}</div>

      {/* 个人中心页面的左侧菜单栏 */}
      <div className="u-flex u-flex-column u-flex-justifyCenter u-flex-alignCenter profileSideMenu__container">
        <div
          className={`profileSideMenu__personalCenter ${
            props.activeComponent === "info" ? "profileSideMenu--active" : ""
          }`}
          onClick={() => {
            props.handleClick("info");
          }}
        >
          <span className="profileSideMenu__title">我的信息</span>
        </div>

        {publishJob && (
          <div
            className={`profileSideMenu__personalresume ${
              props.activeComponent === "publishJob"
                ? "profileSideMenu--active"
                : ""
            }`}
            onClick={() => {
              props.handleClick("publishJob");
            }}
          >
            <span className="profileSideMenu__title">发布职位</span>
          </div>
        )}

        <div
          className={`profileSideMenu__personalresume ${
            props.activeComponent === "resume" ? "profileSideMenu--active" : ""
          }`}
          onClick={() => {
            props.handleClick("resume");
          }}
        >
          <span className="profileSideMenu__title">我的简历</span>
        </div>
      </div>
    </div>
  );
}
