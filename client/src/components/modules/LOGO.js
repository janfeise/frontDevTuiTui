import React from "react";

// 导入css库
import "./LOGO.css"

// 导入图片
import Logo from '../../../public/images/Logo/Logo4.png';

/* 
* LOGO
*/

const LOGO = () => {
    return (
        <img src={Logo} alt='Logo' className='img-logo'/>
    );
};

export { LOGO };