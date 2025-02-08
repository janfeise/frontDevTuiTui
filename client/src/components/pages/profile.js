/**
 * 个人中心页面
 */
/* 导入react */
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/* 导入组件 */
import ProfileSideMenu from "../modules/profileSideMenu";
import ProfileInfo from "../modules/profileInfo";
import Resume from "./resume";

/* 导入样式 */
import "../../utilities.css";
import style from "./profile.module.css";

const Profile = () => {
  const [profileParams, setProfileParams] = useSearchParams();
  const initialTab = profileParams.get("tab") || "info";
  const [activeComponent, setActiveComponent] = useState(initialTab); // 通过state决定右侧渲染的组件

  const handleMenuClick = (value) => {
    setActiveComponent(value);
    setProfileParams({ tab: value });
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "info":
        return <ProfileInfo />;
      case "resume":
        return <Resume />;
      default:
        return <p>hhhh</p>;
    }
  };

  useEffect(() => {
    document.title = "TuiTui-个人中心";
  }, []);

  useEffect(() => {
    setActiveComponent(profileParams.get("tab"));
  }, [profileParams]);

  return (
    <div className={`u-flex ${style.profileContainer}`}>
      <div
        className={`u-flex u-flex-column u-flex-alignCenter ${style.profileMenuContainer}`}
      >
        {/* 个人中心的左侧菜单栏 */}
        <ProfileSideMenu
          activeComponent={activeComponent}
          handleClick={handleMenuClick}
        />
      </div>
      <div className={`${style.profileDetailes}`}>
        {/* 个人中心右侧详情页面 */}
        {renderComponent()}
      </div>
    </div>
  );
};

export default Profile;
