/**
 * 工作页面，展示所有工作
 */

import React from "react";

// /* 导入组件 */


/* 导入样式 */
import style from "./WorkPage.module.css";
import "../utilities.css";

const WorkPage = () => {
  return (
      <div
        className={`u-flex u-flex-1 ${style.mainContainer}`}
      >
        <div className={`${style.sideBar}`}>
          <SideBar />
        </div>
        <div className={style.workContainer}>
          <WorkDisply />
        </div>
        <div className={`${style.sideBar}`}>
          <SideBar />
        </div>
      </div>
  );
};

export default WorkPage;
