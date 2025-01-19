/**
 * 主页展示的每一个工作的模板
 */

/* 导入react */
import React, { useState, useEffect } from "react";

/* 导入实用函数 */
import { get } from "../../utilities.js";

/* 导入样式 */
import "../../utilities.css";
import style from "./work.module.css";

/**
 * 找工作页面展示的每个工作的模板
 *
 * @properties
 * @param {number} size - 每页最大展示的工作数
 * @param {number} currentPage - 主页分页展示工作的当前分页
 * @param {number} total - 总工作数量
 * @param {[]} currentPageWorks - 当前页面的工作
 */
const Work = (props) => {
  return (
    <>
      {/* From Uiverse.io by Creatlydev */}

      {props.currentPageWorks.length > 0 ? (
        props.currentPageWorks.map((work, index) => (
          <div key={index} className={`u-flex u-flex-column ${style.work}`}>
            <div className={`u-flex u-flex-spaceBetween ${style.upContainer}`}>
              {/* 上侧div */}
              <div className={`${style.workContainer}`}>
                {/* 职位名称 */}
                <span className="u-fontLargeSize">{work.publishTitle}</span>
                {/* 测试 */}
                <span>{work.recruitmentId}</span>

                {/* 公司福利 */}
                <div className={`${style.companyBenefits}`}>
                  <span>五险一金</span>
                  <span>周末双休</span>
                </div>

                {/* 薪资 */}
                <div className={style.money}>
                  <span>
                    {work.minMonthlySalary}K ~ {work.maxMonthlySalary}K/月
                  </span>
                </div>
              </div>
              <div className={`${style.bookmark}`}>收藏</div>
            </div>

            <div className={`u-flex u-flex-spaceBetween ${style.downContainer}`}>
              <div>
                {/* 职位发布者和职位所在城市userAndCity */}
                <div
                  className={`u-flex u-flex-justifyCenter u-flex-alignCenter ${style.userAndCity}`}
                >
                  <div className="u-flex u-flex-alignCenter u-fontSize">
                    {/* 用户 */}
                    <svg
                      t="1736421755667"
                      className={style.icon}
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="6748"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M0.00001 512.077A511.923 511.923 0 1 0 511.92301 0 511.974 511.974 0 0 0 0.00001 512.077z"
                        fill="#FFFFFF"
                        p-id="6749"
                      ></path>
                      <path
                        d="M887.49001 857.89c-13.697-71.82-139.895-140.459-253.165-177.96-5.54-1.846-40.014-17.339-18.417-82.798 56.43-57.815 99.214-150.924 99.214-242.597 0-140.82-93.827-214.742-202.891-214.742s-202.635 73.82-202.635 214.742c0 91.98 42.784 185.45 99.317 243.162 22.059 57.712-17.34 79.207-25.65 82.08-107.73 38.834-232.903 107.73-246.702 177.96a511.307 511.307 0 1 1 887.49-346.635 507.87 507.87 0 0 1-136.56 346.788"
                        fill="#B8D4FF"
                        p-id="6750"
                      ></path>
                    </svg>
                    <span>{work.publisherAccount}</span>
                  </div>
                  {/* 城市 */}
                  <svg
                    t="1736415105181"
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4564"
                    width="35"
                    height="35"
                  >
                    <path
                      d="M213.333333 192m21.333334 0l320 0q21.333333 0 21.333333 21.333333l0 618.666667q0 21.333333-21.333333 21.333333l-320 0q-21.333333 0-21.333334-21.333333l0-618.666667q0-21.333333 21.333334-21.333333Z"
                      fill="#D9ECFF"
                      p-id="4565"
                    ></path>
                    <path
                      d="M554.666667 874.666667H234.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h320a42.666667 42.666667 0 0 1 42.666666 42.666666v618.666667a42.666667 42.666667 0 0 1-42.666666 42.666667zM234.666667 213.333333v618.666667h320V213.333333z"
                      fill="#409EFF"
                      p-id="4566"
                    ></path>
                    <path
                      d="M576 390.4m21.333333 0l213.333334 0q21.333333 0 21.333333 21.333333l0 420.266667q0 21.333333-21.333333 21.333333l-213.333334 0q-21.333333 0-21.333333-21.333333l0-420.266667q0-21.333333 21.333333-21.333333Z"
                      fill="#FFFFFF"
                      p-id="4567"
                    ></path>
                    <path
                      d="M810.666667 874.666667H597.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V411.733333a42.666667 42.666667 0 0 1 42.666666-42.666666h213.333334a42.666667 42.666667 0 0 1 42.666666 42.666666V832a42.666667 42.666667 0 0 1-42.666666 42.666667zM597.333333 411.733333V832h213.333334V411.733333z"
                      fill="#409EFF"
                      p-id="4568"
                    ></path>
                    <path
                      d="M149.333333 832m21.333334 0l704 0q21.333333 0 21.333333 21.333333l0 0q0 21.333333-21.333333 21.333334l-704 0q-21.333333 0-21.333334-21.333334l0 0q0-21.333333 21.333334-21.333333Z"
                      fill="#409EFF"
                      p-id="4569"
                    ></path>
                    <path
                      d="M298.666667 362.666667m21.333333 0l149.333333 0q21.333333 0 21.333334 21.333333l0 0q0 21.333333-21.333334 21.333333l-149.333333 0q-21.333333 0-21.333333-21.333333l0 0q0-21.333333 21.333333-21.333333Z"
                      fill="#409EFF"
                      p-id="4570"
                    ></path>
                    <path
                      d="M298.666667 512m21.333333 0l149.333333 0q21.333333 0 21.333334 21.333333l0 0q0 21.333333-21.333334 21.333334l-149.333333 0q-21.333333 0-21.333333-21.333334l0 0q0-21.333333 21.333333-21.333333Z"
                      fill="#409EFF"
                      p-id="4571"
                    ></path>
                    <path
                      d="M298.666667 661.333333m21.333333 0l149.333333 0q21.333333 0 21.333334 21.333334l0 0q0 21.333333-21.333334 21.333333l-149.333333 0q-21.333333 0-21.333333-21.333333l0 0q0-21.333333 21.333333-21.333334Z"
                      fill="#409EFF"
                      p-id="4572"
                    ></path>
                    <path
                      d="M640 512m21.333333 0l85.333334 0q21.333333 0 21.333333 21.333333l0 0q0 21.333333-21.333333 21.333334l-85.333334 0q-21.333333 0-21.333333-21.333334l0 0q0-21.333333 21.333333-21.333333Z"
                      fill="#E6A23C"
                      p-id="4573"
                    ></path>
                    <path
                      d="M640 661.333333m21.333333 0l85.333334 0q21.333333 0 21.333333 21.333334l0 0q0 21.333333-21.333333 21.333333l-85.333334 0q-21.333333 0-21.333333-21.333333l0 0q0-21.333333 21.333333-21.333334Z"
                      fill="#E6A23C"
                      p-id="4574"
                    ></path>
                  </svg>
                  <span>成都</span>
                </div>
              </div>
              <div>
                <div className="u-flex u-flex-alignCenter u-flex-justifyCenter u-fontSpacing right">
                  <button className={style.button}>申请</button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={`u-flex u-flex-alignCenter u-flex-justifyCenter u-fontSize ${style.nullData}`}>没有更多数据了...</div> // 提示内容加载中
      )}
    </>
  );
};

export { Work };
