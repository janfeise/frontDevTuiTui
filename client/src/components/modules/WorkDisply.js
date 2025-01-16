/**
 * 实现：展示工作
 */

/* 导入react */
import React, { use, useEffect, useState } from "react";

/* 导入组件 */
import { Work } from "./work";
import PaginationCustom from "./pagination";

/* 导入样式 */
import "./main.css";
import "../../utilities.css";
import style from "./workDisply.module.css";

/**
 * 工作详情页
 *
 * @param {Number} currentPage 当前所在页面
 * @param {Number} size 工作页面：每页展示工作条数
 * @param {Number} total 工作总数
 * @param {Array} currentPageWorks 当前页面工作数组
 * @param {Array} subTags 小类标签
 * @param {Array} subTagsId 小类标签的ID
 * @param {Function} setSubTagsId 设置小类标签
 * @param {Function} postMethod 发送请求
 */
const WorkDisply = ({
  currentPage,
  size,
  total,
  currentPageWorks = [],
  setCurrentPage,
  setSize,
  subTags = [],
  postMethod = () => {},
  subTagsId = [],
  setSubTagsId = () => {},
}) => {
  const changePage = (page) => {
    setCurrentPage(page);
  };

  /**
   * 改变size
   */
  const handleChangeSize = (value) => {
    setSize(value);
  };

  /**
   * 当currentPage发生变化时，重新向后端获取works
   *    - 用户可能点击分页的左右箭头，此时页面变化，works应发生变化
   *
   * @function handleChangeCurrentPage
   */
  const handleChangeCurrentPage = () => {
    postMethod(currentPage, size, subTagsId);
  };

  /* 当小类标签发生变化时发送请求 */
  useEffect(() => {
    handleChangeCurrentPage();
  }, [currentPage, size, subTagsId]);

  /* 全选小类标签 */
  const handleSelectAll = (e) => {
    setSubTagsId(e.target.checked ? subTags.map((tag) => tag.id) : []);
  };

  /* 选择单个小标签 */
  const handleSelectSubTag = (id) => {
    setSubTagsId((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 测试
  useEffect(() => {
    console.log("小类标签：", subTagsId);
  }, [subTagsId]);

  return (
    <div
      className={`u-flex u-flex-column u-flex-spaceBetween ${style.mainContent}`}
    >
      {/* 渲染小类标签 */}
      {subTags.length ? (
        <div className={`u-flex ${style.subTags}`}>
          {/* 全选 */}
          <label htmlFor="selectAll">
            <input type="checkbox" id="selectAll" onChange={handleSelectAll} />
            全选
          </label>
          {subTags.map((tag) => (
            tag.status === 0
            &&
            <label htmlFor={tag.id} key={tag.id} onClick={() => {}}>
              <input
                type="checkbox"
                id={tag.id}
                onChange={() => {
                  handleSelectSubTag(tag.id);
                }}
              />
              {tag.name}
            </label>
          ))}
        </div>
      ) : (
        <div
          className={`u-flex u-flex-alignCenter u-flex-justifyCenter u-fontFamily ${style.title}`}
        >
          热门职位
        </div>
      )}
      {/* 展示该分页上的工作 */}
      <div className="u-flex-1 works">
        <Work
          size={size}
          currentPage={currentPage}
          total={total}
          currentPageWorks={currentPageWorks}
        />
      </div>

      {/* 分页 */}
      <div className={style.pagination}>
        <PaginationCustom
          currentPage={currentPage}
          setPage={changePage}
          total={total}
          size={size}
          changeSize={handleChangeSize}
          postMethod={postMethod}
        />
      </div>
    </div>
  );
};

export default WorkDisply;
