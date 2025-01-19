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
  const {TOKEN} = useContext(GlobalContext);

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
    setActive(index);

    // 导航栏页面跳转
    // const NAVBAR_ITEMS = ["主页", "找工作", "招聘圈", "关于"];

    // 主页跳转
    if (NAVBAR_ITEMS[0] === text)
    {
      navigate("/");
    }

    // 工作页面跳转
    if (NAVBAR_ITEMS[1] === text) {
      if (!TOKEN) {
        return <Navigate to="/login" replace />;
      }     
      navigate("/findJob")
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
              width: "140px",
              height: "40px",
              borderRadius: "10px", // 圆角
              margin: "10px",
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
          style={{
            "--underlineFontSize": underlineFontSize,
            "--fontBoldSize": fontBoldSize,
          }}
        >
          <div
            onMouseEnter={() => handleMouseEnter(5)}
            onMouseLeave={() => handleMouseLeave(5)}
          >
            <UnderLineDiv
              {...config}
              text="个人"
              fontSize={getFontSize(5)}
              textColor={getTextColor(5)}
              onClick={() => handleClick(5)}
            />
            {dropMenuState[5] && (
              /* 下拉菜单 */
              <DropMenu
                textArray={userMenuOptions}
                onItemClick={handleUserDropMenu}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
