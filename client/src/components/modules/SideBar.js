/**
 * 工作页面的侧栏：大类筛选
 */

/* 导入react */
import React, { use, useEffect, useState } from "react";

/* 导入组件 */
import UnderLineDiv from "./UnderLineDiv";

/* 导入get请求 */
import { get } from "../../utilities";

/* 导入样式 */
import style from "./SideBar.module.css";
import "../../utilities.css";

/**
 * （左）侧栏：大类筛选
 *
 * @param {Array} mainTags 大类标签
 * @param {Array} subTags  小类标签
 * @param {Function} setSubTags 修改小类标签
 */
const SideBar = (props) => {
  // 大类标签所对的id
  const [mainTagsId, setMainTagsId] = useState(null);
  // 大类标签请求成功则渲染小类标签
  const [mainTagsAcive, setMainTagsAciveId] = useState(false);

  // 获取root定义的宽度
  const root = document.documentElement; // 获取 :root 元素
  const rootStyles = getComputedStyle(root); // 获取 :root 的计算样式
  const sideBarWidth = rootStyles.getPropertyValue("--SideBarWidth"); // 获取 --SideBarWidth 的值

  useEffect(() => {
    console.log("props." + props.mainTags);
  }, [props.mainTags]);

  /* 大类标签的id */
  const handleClick = (id) => {
    // console.log(id);
    setMainTagsId(id);
  };

  /* 通过大类标签请求小类标签 */
  useEffect(() => {
    const params = {
      id: mainTagsId,
    };
    // 发送请求
    if (mainTagsId !== null) {
      get("/tag-classifications/get/id", params).then((res) => {
        if (res.code === 200) {
          props.setSubTags(res.data.tags);
        }
      });
    }
  }, [mainTagsId]);

  return (
    <div className={`u-flex u-flex-column u-flex-alignCenter ${style.SideBar}`}>
      {props.mainTags &&
        props.mainTags.map((tag) => (
          <div
            key={tag.id}
            className={`${style.container}`}
            onClick={() => {
              handleClick(tag.id);
            }}
          >
            <UnderLineDiv width={sideBarWidth} text={tag.categoryName} />
          </div>
        ))}
    </div>
  );
};

export default SideBar;
