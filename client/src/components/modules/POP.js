import React, { useEffect, useState } from "react";
import style from "./POP.module.css";

/**
 * 自定义弹窗，代替alert：显示错误信息；如：密码错误
 * UI库：https://uiverse.io/andrew-demchenk0/nervous-bear-89
 *
 * @param {string} errInfo: 显示的错误信息
 * 逻辑：当父组件传递的errInfo：不为空时，显示错误信息并且执行动画：从页面正中心上滑到页面顶部
 * @param {string} popTextColor 弹窗文字颜色，显示错误信息的color？正确信息的color？
 */

const POP = (props) => {
    const textColor = props.popTextColor || 'white'; // 默认情况是白色
    const info = props.errInfo || "弹窗样例文字"; // 默认情况显示："样例文字"

  return (
    props.errInfo && (
      <div className={`${style.info} ${style.visible}`}>
        <div className={style.info__icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            viewBox="0 0 24 24"
            height="24"
            fill="none"
          >
            <path
              fill="#393a37"
              d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"
            ></path>
          </svg>
        </div>
        <div className={style.info__title}
            style={{"--popTextColor": textColor}}
        >{info}</div>
      </div>
    )
  );
};

export { POP };
