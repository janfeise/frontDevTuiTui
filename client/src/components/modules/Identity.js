import React from "react";

import "./Identity.css"

/* 
* 身份选择组件：在职者？求职者？
*
* @param {0, 1} identity: 0表示在职者，1表示求职者
*/

const Identity = (props) => {
    return (
        <div className="u-inline u-fontFamily u-fontLargeSize u-fontSpacing identity">
            <span>您的身份</span><br /> 
            <div className="u-border">
                <label className="u-fontSize option">
                    <input
                    type="radio"
                    value="option1"
                    checked={props.identity == "0"}
                    onChange={props.onChange}
                    />
                    <span>在职者</span>
                </label>
                
                <label className="u-fontSize option">
                    <input
                    type="radio"
                    value="option2"
                    checked={props.identity == "1"}
                    onChange={props.onChange}
                    />
                    <span>求职者</span>
                </label>
            </div>
        </div>
    );
};

export { Identity };