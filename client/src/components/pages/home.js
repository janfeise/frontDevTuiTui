/**
 * 主页
 */

/* 导入react */
import React from "react";

/* 导入组件 */
import NavBar from "../modules/NavBar";
import SideBar from "../modules/SideBar";
import Main from "../modules/main";

/* 导入样式 */
import "../../utilities.css";
import "./home.css"

const HomePage = () => {
    return (
        <>
            <div className="u-flex u-flex-column homepage">
                <div>
                    <NavBar />
                </div>
                <div className="u-flex u-flex-1">
                    <div className="u-flex u-flex-alignCenter sidebar">
                        <SideBar />
                    </div>
                    <div className="u-flex u-flex-justifyCenter u-flex-1 main">
                        <Main />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;