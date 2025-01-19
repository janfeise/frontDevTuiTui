import React from "react";

import style from "./Button.module.css";
import Loading from "../modules/Loading.js";

/**
 * 一个按钮：可显示loading
 *
 * @param {string} TEXT 按钮显示的内容：登录？注册？
 * @param {string} account 传递用户的account
 * @param {string} password 传递用户的密码
 * @param {boolean} isloading 显示加载图像
 * @param {() => {handleClick}} handleClick: 当点击按钮时触发的函数
 */
const Button = (props) => {
  const loadingWidth = 25; // loading加载圈的宽度

  const handleClick = (e) => {
    e.preventDefault();
    props.handleClick(props.account, props.password);
  };

  return (
    <button
      type="submit"
      onClick={handleClick}
      value="Submit"
      className={`u-width u-height u-fontLargeSize u-fontLargeSpacing u-flex u-flex-justifyCenter u-flex-alignCenter ${style.button}`}
    >
      <div className={`u-flex u-flex-justifyCenter u-flex-alignCenter ${style.loading}`}>
        {props.isloading && <Loading loadingWidth={loadingWidth} />}
      </div>
      <div className={style.text}>{props.TEXT}</div>
    </button>
  );
};

export { Button };
