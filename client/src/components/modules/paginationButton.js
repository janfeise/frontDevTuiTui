/**
 * 实现分页的按钮，如：1, 2, 3, 4等的模版
 */

// 导入react
import React, {useState, useEffect} from "react";

// 导入样式
import "../../utilities.css";
import "./paginationButton.css";

/**
 *
 * @param {number} page - 页码
 * @param {number} currentPage - 主页当前所在页码
 * @param {Function} setPage - 当点击页面时更新父组件对应的currentPage
 * @param {size} size - 每页最多展示的工作数量
 * @param {Function} postMethod - 点击页码按钮时发送get请求获取该页码所对应的works
 * @param {number} totalPages - 总页数
 */
const PaginationButton = (props) => {
  const [activePage, setActivePage] = useState(0);

  // 测试
  useEffect(() => {
    console.log(typeof(props.page));
  }, [props.page]);

  const handleClick = (event) => {
    if (event.target.value === "... ") {
      // 处理右侧...
      const add = Math.floor(props.totalPages / 10) < 1 ? 1 : Math.floor(props.totalPages / 10);
      const temp = props.currentPage + add;
      const page = temp > props.totalPages ? props.totalPages : temp;
      props.setPage(page);
    } else if (event.target.value === " ...") {
      // 处理左侧...
      const add = Math.floor(props.totalPages / 10) < 1 ? 1 : Math.floor(props.totalPages / 10);
      const temp = props.currentPage - add;
      const page = temp < 1 ? 1 : temp;
      props.setPage(page);
    }
    else {
      props.setPage(props.page - 1);
    }
    props.postMethod(props.currentPage, props.size, []); // 默认空数组：请求所有work
  };

  

  return (
    <button
      className={`${props.currentPage === activePage ? "active" : ""} base`}
      onClick={handleClick}
      value={props.page}
    >
      {props.page}
    </button>
  );
};

export { PaginationButton };
