/**
 * 实现：导航栏
 */
// 导入react
import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

// 导入全局状态管理的组件
import { GlobalContext, GlobalStateProvider } from "../context/AppContext.js";

// 导入组件
import UnderLineDiv from "./UnderLineDiv.js";
import { DropMenu } from "./dropMenu.js";

import HomoLogo from "../../../public/images/Logo/HomeLogo.png";

import "./NavBar.css";
import "../../utilities.css";

/**
 * 导航栏
 *
 * @param {Function} handleLogout 登出功能：清除本地token，刷新页面
 */
// 导航栏内容
const NAVBAR_ITEMS = ["主页", "找工作", "招聘圈", "关于"];

// 导航栏：个人的下拉菜单
const userMenuOptions = ["我的主页", "登出"];

const NavBar = (props) => {
  // 使用 useContext 来获取全局状态
  const { TOKEN } = useContext(GlobalContext);

  // 配置基础属性：不会发生改变的属性
  // 获取utilities.css文件的root中定义的 CSS 变量
  const root = document.documentElement;
  const underlineDivWidth = getComputedStyle(root)
    .getPropertyValue("--underlineDivWidth")
    .trim(); // 获取div宽度
  const underlineDivHeight = getComputedStyle(root)
    .getPropertyValue("--navbar-height")
    .trim(); // 获取地址高度
  const underlineFontSize = getComputedStyle(root)
    .getPropertyValue("--ml")
    .trim(); // 获取默认字体大小
  const fontBoldSize = getComputedStyle(root).getPropertyValue("--l").trim(); // 粗字体
  // 对象存储
  const config = {
    width: underlineDivWidth, // 导航栏内部组件（每一个div）的宽度，有单位px
    height: underlineDivHeight, // 导航栏内部组件（每一个div）的高度，有单位px
    underLineColor: "rgb(255, 255, 255, 0.9)", // 下划线的颜色
    underLineSize: 1.8, // 下划线的尺寸（粗细），没有单位须自动添加px
  };

  // 实现: 点击事件状态存储, 默认为0, 0表示主页
  const [activeIndex, setActive] = useState(0);

  // 导航栏下拉菜单状态管理
  const [dropMenuState, setDropMenuState] = useState({});

  // 导航栏跳转
  const navigate = useNavigate();

  // 点击导航栏个人的下拉菜单各项时，所对应的点击事件函数
  const handleUserDropMenu = (index, text) => {
    // 我的主页
    if (userMenuOptions[0] === text) {
      console.log("我的主页");
    }

    // 登出
    else if (userMenuOptions[1] === text) {
      props.handleLogout();
    }
  };

  // 处理鼠标进入和离开的事件
  const handleMouseEnter = (index) => {
    setDropMenuState((prev) => ({
      ...prev,
      [index]: true,
    }));
  };
  const handleMouseLeave = (index) => {
    setDropMenuState((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  // 点击事件：找到对应的组件<UnderLineDiv>
  const handleClick = (index, text) => {
    if (activeIndex === index) return;  // 如果当前已经是选中状态，直接返回，不再更新
    setActive(index);

    // 导航栏页面跳转
    // const NAVBAR_ITEMS = ["主页", "找工作", "招聘圈", "关于"];

    // 主页跳转
    if (NAVBAR_ITEMS[0] === text) {
      navigate("/");
      return;
    }

    // 工作页面跳转
    if (NAVBAR_ITEMS[1] === text) {
      navigate("/findJob");
      return;
    }

    if (NAVBAR_ITEMS[2] === text) {
      navigate("/JobCircle");
      return;
    }
    // 个人中心跳转
    if (text === "个人中心")
    {
      console.log("个人中心")
      navigate("userSpace");
      return;
    }
  };

  const getFontSize = (index) => {
    return activeIndex === index ? fontBoldSize : underlineFontSize;
  };

  const getTextColor = (index) => {
    return activeIndex === index
      ? "rgb(255, 255, 255)"
      : "rgb(255, 255, 255, 0.9)";
  };

  return (
    <header>
      <div className="u-flex u-flex-spaceBetween u-flex-alignCenter NavBar">
        <div className="u-flex left">
          {/* LOGOIcon */}
          <img
            style={{
              width: "145px",
              height: "40px",
              borderRadius: "10px", // 圆角
              margin: "10px",
              marginLeft: "30px",
              marginRight: "-10px",
            }}
            src={HomoLogo}
            alt="HomeLogo"
          />

          {NAVBAR_ITEMS.map((text, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <UnderLineDiv
                {...config}
                text={text}
                fontSize={getFontSize(index)}
                textColor={getTextColor(index)}
                onClick={() => handleClick(index, text)}
              />
              {dropMenuState[index] && (
                <div>
                  {/* {index === 0 && <DropMenu />} */} {/* 主页的下拉菜单 */}
                  {/* {index === 1 && <DropMenu />} */} {/* 找工作的下拉菜单 */}
                  {index === 2 && <DropMenu />}  {/* 招聘圈的下拉菜单 */}
                  {index === 3 && <DropMenu />} {/* 关于的下拉菜单 */}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className="right work"
        >
          <div
            onMouseEnter={() => handleMouseEnter(5)}
            onMouseLeave={() => handleMouseLeave(5)}
          >
            <div className="u-flex u-flex-spaceBetween u-flex-alignCenter profile-container"
              onClick={() => handleClick(5, "个人中心")}
            >
              {/* 个人中心 */}
              <div className="profile-avatar-box">
                {/* 头像 */}
                <svg t="1737773199939" className="profile-avatar" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4242" width="200" height="200"><path d="M956.696128 512.75827c0 245.270123-199.054545 444.137403-444.615287 444.137403-245.538229 0-444.522166-198.868303-444.522166-444.137403 0-188.264804 117.181863-349.108073 282.675034-413.747255 50.002834-20.171412 104.631012-31.311123 161.858388-31.311123 57.297984 0 111.87909 11.128455 161.928996 31.311123C839.504032 163.650197 956.696128 324.494489 956.696128 512.75827L956.696128 512.75827M341.214289 419.091984c0 74.846662 38.349423 139.64855 94.097098 171.367973 23.119557 13.155624 49.151443 20.742417 76.769454 20.742417 26.64894 0 51.773154-7.096628 74.286913-19.355837 57.06467-31.113625 96.650247-96.707552 96.650247-172.742273 0-105.867166-76.664054-192.039781-170.936137-192.039781C417.867086 227.053226 341.214289 313.226864 341.214289 419.091984L341.214289 419.091984M513.886977 928.114163c129.883139 0 245.746984-59.732429 321.688583-153.211451-8.971325-73.739445-80.824817-136.51314-182.517917-167.825286-38.407752 34.55091-87.478354 55.340399-140.989081 55.340399-54.698786 0-104.770182-21.907962-143.55144-57.96211-98.921987 28.234041-171.379229 85.823668-188.368158 154.831344C255.507278 861.657588 376.965537 928.114163 513.886977 928.114163L513.886977 928.114163M513.886977 928.114163 513.886977 928.114163z" fill="#272636" p-id="4243"></path></svg>
              </div>

              <div className="profile-info-box">
                {/* 用户名和账号 */}
                {/* 默认：用户名不存在，如果不存在则，显示：个人中心 */}
                <span className="profile-name">个人中心</span>
                <span className="profile-account">账号：{22222222}</span>
              </div>
            </div>
            {dropMenuState[5] && (
              /* 下拉菜单 */
              <div className="dropdown-menu"><DropMenu
                textArray={userMenuOptions}
                onItemClick={handleUserDropMenu}
              /></div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;