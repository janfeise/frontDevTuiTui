/**
 * 实现动画：当鼠标hover时，div的底部出现下划线的动画（在导航栏使用）
 *
 * 仅实现了：下划线动画的效果
 */

/* 导入react */
import React from "react";

/* 导入样式 */
import style from "./UnderLineDiv.module.css";
import "../../utilities.css";

/**
 * 实现动画：当鼠标hover时，div的底部出现下划线的动画（在导航栏使用）; 父组件在NavBar.js
 *
 * @param {string} text 文字
 * @param {number} width div宽度
 * @param {number} height div高度
 * @param {string} underLineColor 下划线的颜色
 * @param {string} textColor 文本颜色
 * @param {string} underLineSize 下划线的尺寸
 * @param {string} fontSize 字体大小
 * @param {function} onClick 点击事件回调函数
 */
const UnderLineDiv = ({
  text = "样例文字",
  width = "100px",
  height = "60px",
  underLineColor = "grey",
  textColor = "black",
  underLineSize = 1,
  fontSize = getComputedStyle(document.documentElement).getPropertyValue("--m").trim(),
  onClick = () => {},
}) => {
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick();
    } else {
      // console.log("默认");
    }
  };

  return (
    <div
      className={`u-flex u-flex-alignCenter u-flex-justifyCenter ${style.container}`}
      style={{
        "--divWidth": width,
        "--divHeight": height,
        "--underLineSize": `${underLineSize}px`,
        "--fontSize": fontSize,
        color: underLineColor,
      }}
      onClick={handleClick}
    >
      <span className={style.text} style={{ color: textColor,
        "letterSpacing": "2px",
       }}>
        {text}
      </span>
    </div>
  );
};

export default UnderLineDiv;
