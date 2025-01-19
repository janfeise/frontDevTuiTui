/**
 * 下拉菜单
 */
// 导入react
import React, { useState, useRef, useEffect } from "react";

// 导入组件
import UnderLineDiv from "./UnderLineDiv";

// 导入css库
import style from "./DropMenu.module.css";
import "../../utilities.css";

/**
 * 下拉菜单
 *
 * @param {Array} textArray 下拉菜单所显示的文本
 * @param {Number} specialTextIndex 特殊文本所对应的索引：某些文本，如：登出字体需红色等
 * @param {string} specialStyle 特殊样式：将特殊样式应用到特殊文本
 * @param {Function} onItemClick 点击菜单项时触发的回调函数，参数为(index, text)
 */

const DropMenu = ({
  /* 默认状态 */
  textArray = ["样例文字1", "样例文字2"],
  specialTextIndex = null,
  specialStyle = null,
  onItemClick = () => {},
}) => {
  const menuRef = useRef(null); // 获取DOM元素：即获取下拉菜单
  const [menuStyle, setMeunStyle] = useState({}); // 下拉菜单样式

  // 下拉菜单位置调整
  useEffect(() => {
    // 位置调整
    adjustMenuPosition();

    // 监听窗口大小变化
    window.addEventListener("resize", adjustMenuPosition);
    return () => window.removeEventListener("resize", adjustMenuPosition);
  }, []);

  // 下拉菜单位置调整函数实现
  const adjustMenuPosition = () => {
    // menuRef和下拉菜单绑定，如果为null说明下拉菜单没有出现，无需调整
    if (menuRef.current === null) return;

    // 检测下拉菜单位置
    const menuRect = menuRef.current.getBoundingClientRect(); // getBoundingClientRect()可获取DOM元素相较于浏览器窗口的位置
    // 获取浏览器窗口宽度
    const viewportWidth = window.innerWidth;

    // 样式
    const newStyle = {};

    // 检测是否超出屏幕
    if (menuRect.right > viewportWidth) {
      newStyle.right = 0;
    }

    setMeunStyle(newStyle);
  };

  return (
    <div
      className={style.dropMenu}
      style={menuStyle} // 应用动态样式
      ref={menuRef}
    >
      {textArray.map((text, index) => (
        <UnderLineDiv
          text={text}
          key={index}
          onClick={() => {
            console.log("UnderLineDiv clicked:", text, index);
            onItemClick(index, text);
          }}
        />
      ))}
    </div>
  );
};

export { DropMenu };
