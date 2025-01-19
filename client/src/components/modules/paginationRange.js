/**
 * 功能：生成分页范围
 * 示例：
 * const result = returnPaginationRange(10, 5, 5, 2);
 * console.log(result);
 *   // 输出: [1, "...", [3, 4, 5, 6, 7], "...", 10]
 *
 * 
 * @param {number} totalPages 
 * @param {number} currentPage 
 * @param {number} size 
 * @param {number} siblings - 邻近页数
 * @returns {Array} 
 */

/* *
 * 实现分析：
 *      - 1. 右侧...：当页数 > 4时显示
 *      - 2. 左侧...: 当页数 > totalPage - 3时显示
 */

export const returnPaginationRange = (totalPages, currentPage, size, siblings) => {
    ++currentPage;
    let leftIndex = 5; // 左侧索引
    let rightIndex = totalPages - 4; // 右侧索引

    if (totalPages <= 0)
    {
        return [1];
    }
    else if (totalPages <= 7)
    {
        // 页数太少，无需...
        return [...generateRange(1, totalPages)];
    }
    else if (currentPage < leftIndex)
    {
        // 显示右侧...
        return [...generateRange(1, 5), "... ", totalPages];
    }
    else if (currentPage == leftIndex)
    {
        // 显示右侧...
        return [...generateRange(1, 6), "... ", totalPages];
    }
    else if (currentPage >= rightIndex && currentPage <= totalPages - 3)
    {
        // 显示左侧...
        return [1, " ...", ...generateRange(currentPage - siblings, totalPages)];
    }
    else if (currentPage >= totalPages - 3)
    {
        // 显示左侧...
        return [1, " ...", ...generateRange(totalPages - 4, totalPages)];
    }
    else
    {
        // 左右两侧皆显示...
        return [1, " ...", ...generateRange(currentPage - siblings, currentPage + siblings), "... ", totalPages];
    }
};


/**
 * 功能：
 *  const result = [...generateRange(1, 10)];
 *  console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * 
 * @param {Number} start - 起始点
 * @param {Number} end - 截止点
 * @returns 
 */
function generateRange(start, end) {
    return [...Array(end - start + 1).keys()].map( i => i + start);
}