import React from "react";

import "../../utilities.css"
import style from "./TextLinkTo.module.css"

/* 
* 文字下划线
* @param {string} content: 文字内容
*/

const TextLinkTo = (props) => {
    return (
        <span className={`${style.text} u-textUnderline u-bold `}>{props.content}</span>
    );
};

export { TextLinkTo };