import React from "react";

import "../../utilities.css"
import "./title.css"

/* 
* 标题：如登录和注册页面的标题
* {string} display: 显示内容（登录？注册？）
*/

const Title = (props) => {
    return (
        <span className="title u-fontLargeSpacing">{props.display}</span>
    );
};

export { Title };