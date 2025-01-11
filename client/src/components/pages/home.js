/**
 * 主页
 */

/* 导入react */
import React from "react";

/* 导入组件 */
import NavBar from "../modules/NavBar";
import SideBar from "../modules/SideBar";
import WorkDisply from "../modules/WorkDisply";

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