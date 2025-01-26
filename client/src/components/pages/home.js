/**
 * 主页
 */

/* 导入react */
import React from "react";

/* 导入组件 */
import Footer from "../modules/Footer";

/* 导入样式 */
import "../../utilities.css";
import "./home.css"

const HomePage = (props) => {
    return (
        <>
            <div className="u-flex u-flex-column homepage">
                <div>Home Page</div>
            </div>
        </>
    );
};

export default HomePage;