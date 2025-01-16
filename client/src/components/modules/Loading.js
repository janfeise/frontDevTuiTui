/**
 * 实现：loading效果，圆圈loading，由几个小圆点旋转
 */

/* 导入react */
import React, { useState } from "react";

/* 导入样式 */
import style from "./Loading.module.css";

/**
 * 实现：loading加载动画
 *
 * @param {Number} loadingWidth loading加载圆圈的宽度，默认20px
 */
const Loading = ({loadingWidth = 20}) => {
  return (
    <svg
      viewBox="25 25 50 50"
      className={style.loading}
      style={{
        "--loadingWidth": `${loadingWidth}px`,
      }}
    >
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
  );
};
export default Loading;
