import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RecruitmentQuery.css";

const RecruitmentQuery = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedRecruitment, setSelectedRecruitment] = useState(null);
  const [auditCode, setAuditCode] = useState(null);
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState(""); // 选择的驳回原因

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyQWNjb3VudCI6Ijg4ODg4ODg4IiwidXNlcklkZW50aXR5IjoiMiIsImlhdCI6MTczNjU5NDEwOCwiZXhwIjoxNzM3ODAzNzA4fQ.3vtlMNG74zEHNNs4UpfKKyheCgW_vqbkdcvj_wm73f4";

  const [tagNames, setTagNames] = useState({}); // 标签 ID 和标签名的映射

  const fetchTagName = async (tagId) => {
    if (tagNames[tagId]) return; // 如果已缓存，直接返回
    try {
      const response = await axiosInstance.get(`/tags/get/id`, {
        params: { id: tagId }, // 在查询字符串中传递参数
      });
      // 检查响应并提取 `name`
      if (response.data && response.data.code === 200 && response.data.data) {
        const { name } = response.data.data;
        setTagNames((prev) => ({ ...prev, [tagId]: name })); // 更新缓存
      } else {
        console.error(`Unexpected response format:`, response.data);
      }
    } catch (error) {
      console.error(`Failed to fetch tag name for ID ${tagId}`, error);
    }
  };

  useEffect(() => {
    if (selectedRecruitment) {
      selectedRecruitment.tagIds.forEach(fetchTagName); // 获取选中招聘信息的所有标签名
    }
  }, [selectedRecruitment]);

  const axiosInstance = axios.create({
    baseURL: "http://qms198.online:8088",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  const handleError = (error) => {
    console.error("API Error:", error);
    alert(error.response?.data?.message || "请求失败，请稍后重试！");
  };

  const fetchRecruitments = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/recruit/audit/get`, {
        params: { page, size },
      });
      if (response.data.code === 200) {
        setRecruitments(response.data.data.recruitments);
        setTotal(response.data.data.recruitmentTotal);
      } else {
        alert("获取招聘信息失败！");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruitments();
  }, [page, size]);

  const handleNextPage = () => {
    if (page * size + size < total) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleAudit = async () => {
    if (auditCode === null) {
      alert("请选择审核结果！");
      return;
    }
    if (auditCode === 1 && !description && !reason) {
      alert("请填写驳回原因！");
      return;
    }

    try {
      const response = await axiosInstance.post(`/recruit/audit/update`, {
        recruitmentId: selectedRecruitment.recruitmentId,
        auditCode,
        description: auditCode === 1 ? description || reason : undefined,
      });
      if (response.data.code === 200) {
        alert("审核操作成功！");
        fetchRecruitments(); // 刷新列表
        setSelectedRecruitment(null); // 清空审核区域
      } else {
        alert("审核操作失败，请稍后重试！");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const cancelAudit = () => {
    setSelectedRecruitment(null);
    setAuditCode(null);
    setDescription("");
    setReason(""); // 清除选择的驳回原因
  };

  return (
    <div className="recruitment-query">
      <h1>招聘信息审核</h1>

      {/* 审核区域 */}
      {selectedRecruitment && (
        <div className="audit-section">
          <h2>审核招聘信息</h2>
          <p>职位名称: {selectedRecruitment.publishTitle}</p>
          <p>职位简介: {selectedRecruitment.briefIntroduction}</p>
          <p>发布者账号: {selectedRecruitment.publisherAccount}</p>
          <p>发布者手机号: {selectedRecruitment.publisherPhoneNumber}</p>
          <p>
            标签:
            {selectedRecruitment.tagIds.map((tagId) => (
              <span key={tagId} className="tag">
                {tagNames[tagId] || "加载中..."}
              </span>
            ))}
          </p>
          <p>
            发布时间: {new Date(selectedRecruitment.publishTime).toLocaleString()}
          </p>
          <p>
            更新时间: {new Date(selectedRecruitment.editTime).toLocaleString()}
          </p>
          <p>
            薪资范围: {selectedRecruitment.minMonthlySalary} - {selectedRecruitment.maxMonthlySalary} 元
          </p>
          <p>
            截止时间: {new Date(selectedRecruitment.recruitmentDeadline).toLocaleDateString()}
          </p>

          <div className="audit-actions">
            <label>
              <input
                type="radio"
                value={0}
                checked={auditCode === 0}
                onChange={() => setAuditCode(0)}
              />
              审核通过
            </label>
            <label>
              <input
                type="radio"
                value={1}
                checked={auditCode === 1}
                onChange={() => setAuditCode(1)}
              />
              审核驳回
            </label>
          </div>

          {auditCode === 1 && (
            <>
              <label htmlFor="reject-reason">驳回原因</label>
              <select
                id="reject-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">请选择驳回原因</option>
                <option value="1">存在违反国家法律法规内容违规</option>
                <option value="2">存在损害党与国家权益内容违规</option>
                <option value="3">存在传播淫秽色情低俗内容违规</option>
                <option value="4">存在发布虚假欺骗欺诈内容违规</option>
                <option value="5">存在发布涉毒，涉赌内容违规</option>
                <option value="6">存在传播血腥暴力恐怖内容违规</option>
                <option value="7">其它</option>
              </select>

              {reason === "7" && (
                <textarea
                  placeholder="请输入驳回原因"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              )}
            </>
          )}

          <div className="audit-buttons">
            <button onClick={handleAudit}>提交审核</button>
            <button onClick={cancelAudit}>取消</button>
          </div>
        </div>
      )}

      {loading && <p>加载中...</p>}

      {!loading && (
        <>
          <table className="recruitment-table">
            <thead>
              <tr>
                <th>职位名称</th>
                <th>发布者账号</th>
                <th>薪资范围</th>
                <th>发布/更新时间</th>
                <th>招聘人数</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {recruitments.map((recruitment) => (
                <tr key={recruitment.recruitmentId}>
                  <td>{recruitment.publishTitle}</td>
                  <td>{recruitment.publisherAccount}</td>
                  <td>
                    {recruitment.minMonthlySalary} - {recruitment.maxMonthlySalary}
                  </td>
                  <td>
                    {new Date(recruitment.publishTime).toLocaleString()} /{" "}
                    {new Date(recruitment.editTime).toLocaleString()}
                  </td>
                  <td>{recruitment.numberOfDeliveries}</td>
                  <td>{recruitment.status === 2 ? "待审核" : "无效信息"}</td>
                  <td>
                    {recruitment.status === 2 && (
                      <button onClick={() => setSelectedRecruitment(recruitment)}>
                        审核
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 分页控制 */}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={page === 0}>
              上一页
            </button>
            <span>
              第 {page + 1} 页 / 共 {Math.ceil(total / size)} 页
            </span>
            <button
              onClick={handleNextPage}
              disabled={page * size + size >= total}
            >
              下一页
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecruitmentQuery;
