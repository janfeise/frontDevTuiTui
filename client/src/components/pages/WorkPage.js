/**
 * 工作页面，展示所有工作
 */

import React, { useState, useEffect, use } from "react";

/* 导入组件 */
import SideBar from "../modules/SideBar"; // 侧栏
import WorkDisply from "../modules/WorkDisply"; // 工作

/* 导入样式 */
import style from "./WorkPage.module.css";
import "../../utilities.css";

/* 导入post method */
import { post } from "../../utilities.js";

/* 导入get请求 */
import { get } from "../../utilities";

const WorkPage = () => {
  // 标签
  const [mainTags, setMainTags] = useState([]); // 大类标签
  const [subTags, setSubTags] = useState([]); // 小类标签
  const [subTagsId, setSubTagsId] = useState([]); // 小类标签的id

  // 页面
  const [currentPage, setCurrentPage] = useState(0); // 当前是分页展示的第几页？
  const [size, setSize] = useState(10); // 当前分页展示工作的数量，每页10个？
  const [total, setTotal] = useState(0); // 数据库中所有工作的数量
  const [currentPageWorks, setCurrentPageWorks] = useState([]); // 数组形式存储当前页面的工作

  // 测试
  useEffect(() => {
    console.log("currentpage: " + currentPage);
  }, [currentPage]);

  // 从后端获取数据：大类标签
  useEffect(() => {
    // title更新
    document.title = "TuiTui-找工作";

    // 进入主页即刻发送post请求，请求当前页面的works
    postMethod(currentPage, size, []);

    get("/tag-classifications/get/all", {})
      .then((res) => {
        if (res && res.code === 200) {
          setMainTags(res.data);
        } else {
          console.log("Failed or no response");
        }
      })
      .catch((error) => {
        console.log("Request failed:", error);
      });
  }, []);

  // useEffect(() => {
  //   // TODO
  // }, [mainTags, subTags]);

  /**
   * 辅助函数：post请求获取数据; 将改变currentPageWorks
   *
   * @function postMethod
   * @param {number} page - 当前分页页码
   * @param {number} size - 每页最多展示工作数量
   * @param {Array} tagIds - 职位对应的标签
   */
  const postMethod = (page, size, tagIds) => {
    const body = {
      page: page,
      size: size,
      tagIds: tagIds, // 当数组为空时，默认请求所有work
    };

    post("/recruit/get/all", body)
      .then((res) => {
        const { data } = res;
        if (data.code == "200") {
          console.log(data);
          const works = data.data.recruitments;
          setCurrentPageWorks(works || []); // 更新当前页面的工作数组
          setTotal(data.data.recruitmentTotal || 0); // 更新总条目数
          // console.log(data.data.recruitmentTotal);
        } else {
          console.error("请求失败，错误代码:", res.code);
        }
      })
      .catch((error) => {
        console.error("POST 请求失败:", error);
      });
  };

  return (
    <div
      className={`u-flex u-flex-1 u-flex-justifyCenter ${style.mainContainer}`}
    >
      <div className={`${style.sideBar}`}>
        {<SideBar mainTags={mainTags} subTags={subTags} setSubTags={setSubTags} />}
      </div>
      <div className={style.workContainer}>
        <WorkDisply
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          size={size}
          setSize={setSize}
          total={total}
          currentPageWorks={currentPageWorks}
          postMethod={postMethod}
          subTags={subTags}
          subTagsId={subTagsId}
          setSubTagsId={setSubTagsId}
        />
      </div>
      <div className={`${style.sideBar}`}>{<SideBar />}</div>
    </div>
  );
};

export default WorkPage;
