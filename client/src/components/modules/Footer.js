/**
 * 页脚：备案号，TuiTui项目简绍等
 */
/* 导入react */
import React from "react";

/* 导入样式 */
import "../../utilities.css";
import style from "./Footer.module.css";

/**
 * 页脚
 */
export default function Footer() {
    return (
        <div className={`u-flex u-flex-justifyCenter u-flex-alignCenter ${style.Footer}`}>
            <p><a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2024102830号</a></p>
        </div>
    )
}

