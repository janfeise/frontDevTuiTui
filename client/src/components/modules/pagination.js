/**
 * 分页功能实现
 */

/* 导入react */
import React, { useState, useEffect, useMemo } from "react";

/* 导入组件 */
import { PaginationButton } from "./paginationButton";
import { returnPaginationRange } from "./paginationRange";

/* 参考：分页UI */
/* https://ant-design.antgroup.com/components/pagination-cn */
import { Pagination } from "antd";

/* 导入样式 */
import "../../utilities.css";
import "./pagination.css";
/**
 * 分页功能实现
 *
 * @properties
 * @param {number} currentPage - 当前页面
 * @param {number} total - 数据库中存储的总工作数
 * @param {number} size - 当前页面最多展示工作数
 * @param {Function} setPage - 设置页面，当点击对应的按钮如：3时，改变page为3
 * @param {Function} postMethod - 每次点击分页页码发送post请求获取该页码的works
 */
const PaginationCustom = (props) => {
  const [totalPages, settotalPages] = useState(0); // 总共有多少个页面？
  const [pageRange, setpageRange] = useState([]); // 分页范围

  // 第一次进入WorkDisplay即刻获取分页范围
  useEffect(() => {
    settotalPages(props.total / props.size);
    const array = returnPaginationRange(
      totalPages == 0 ? 5 : totalPages,
      props.currentPage,
      props.size,
      2
    );
    setpageRange(array);
    setpageRange();
    // 测试
    // console.log("分页范围：" + array);
  }, []);

  // 当currentPage改变时重新请求分页范围
  useEffect(() => {
    window.scrollTo(0, 0);
    const array = returnPaginationRange(
      totalPages == 0 ? 5 : totalPages,
      props.currentPage,
      props.size,
      2
    );
    setpageRange(array);
  }, [props.currentPage, props.size, totalPages]);

  // 当页面size（size表示每页显示works条数）改变时重新计算totalPage
  useEffect(() => {
    settotalPages(Math.ceil(props.total / props.size));
  }, [props.total, props.size]);

  // useEffect(() => {
  //   console.log(totalPages);
  // }, [totalPages]);

  /**
   * 实现：点击分页左箭头时页面变化
   *
   * @function handleLeftArrow
   */
  const handleLeftArrow = () => {
    props.setPage(props.currentPage - 1 < 0 ? 0 : props.currentPage - 1);
  };

  /**
   * 实现：点击分页右箭头时页面变化
   *
   * @function handleRightArrow
   */
  const handleRightArrow = () => {
    props.setPage(
      props.currentPage + 1 >= totalPages
        ? props.currentPage
        : props.currentPage + 1
    );
  };

  /**
   * 单选框：改变size, 即改变每页显示works的条数; 当size改变时跳转第1页
   *
   * @function handleSelect
   */
  const handleSelect = (event) => {
    window.scrollTo(0, 0); // 回到页面顶部
    props.changeSize(event.target.value);
    props.setPage(0);
  };

  return (
    <>
      <div className="u-flex u-flex-justifyCenter container">
        <div className="u-flex u-flex-justifyCenter pagination">
          {/* 左箭头 */}
          <div className="arrow arrowContainer" onClick={handleLeftArrow}>
            <svg
              t="1733919981170"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6065"
              width="30"
              height="30"
            >
              <path
                className="path1"
                d="M249.647407 512l271.530667-271.530667A42.666667 42.666667 0 0 0 460.837926 180.148148L159.137185 481.848889a42.666667 42.666667 0 0 0 0 60.340148l301.700741 301.700741a42.666667 42.666667 0 1 0 60.340148-60.340148L249.628444 512z"
                p-id="6066"
              ></path>
              <path
                className="path2"
                d="M549.641481 512l271.530667-271.530667A42.666667 42.666667 0 0 0 760.832 180.148148l-301.700741 301.700741a42.666667 42.666667 0 0 0 0 60.340148l301.700741 301.700741a42.666667 42.666667 0 1 0 60.340148-60.340148L549.622519 512z"
                p-id="6067"
              ></path>
            </svg>
          </div>

          <div className="u-flex paginationRange">
            {pageRange.map((range, index) => (
              <PaginationButton
                key={index}
                page={range}
                currentPage={props.currentPage}
                setPage={props.setPage}
                postMethod={props.postMethod}
                size={props.size}
                totalPages={totalPages}
              />
            ))}
          </div>

          {/* 右箭头 */}
          <div className="arrow arrowContainer" onClick={handleRightArrow}>
            <svg
              className="arrow"
              t="1733920050872"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7150"
              width="30"
              height="30"
            >
              <path
                className="path1"
                d="M774.352593 512L502.821926 783.530667a42.666667 42.666667 0 0 0 60.340148 60.340148l301.700741-301.700741a42.666667 42.666667 0 0 0 0-60.340148l-301.700741-301.700741a42.666667 42.666667 0 1 0-60.340148 60.340148L774.371556 512z"
                p-id="7151"
              ></path>
              <path
                className="path2"
                d="M474.358519 512L202.827852 783.530667a42.666667 42.666667 0 0 0 60.340148 60.340148l301.700741-301.700741a42.666667 42.666667 0 0 0 0-60.340148l-301.700741-301.700741a42.666667 42.666667 0 1 0-60.340148 60.340148L474.377481 512z"
                p-id="7152"
              ></path>
            </svg>
          </div>

          {/* 下拉框：展示每页显示条数 */}
          <div>
            <select
              className="select"
              value={props.size}
              onChange={handleSelect}
            >
              <option value={10}>10条/页</option>
              <option value={30}>30条/页</option>
              <option value={50}>50条/页</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaginationCustom;
