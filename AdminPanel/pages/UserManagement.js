import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchAccount, setSearchAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState(null); // 当前编辑的用户

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyQWNjb3VudCI6Ijg4ODg4ODg4IiwidXNlcklkZW50aXR5IjoiMiIsImlhdCI6MTczNjU5NDEwOCwiZXhwIjoxNzM3ODAzNzA4fQ.3vtlMNG74zEHNNs4UpfKKyheCgW_vqbkdcvj_wm73f4";

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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user/get/all");
      if (response.data.code === 200) {
        setUsers(response.data.data || []);
      } else {
        alert("获取用户列表失败！");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const searchUser = async () => {
    if (!searchAccount) {
      alert("请输入用户账号！");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user/userAccount", {
        params: { userAccount: searchAccount },
      });
      if (response.data.code === 200) {
        const user = response.data.data;
        setUsers(user ? [user] : []);
      } else {
        alert("未找到用户！");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("确定删除该用户吗？")) return;
    try {
      await axiosInstance.delete(`/user/delete/${userId}`);
      alert("用户已删除！");
      fetchUsers();
    } catch (error) {
      handleError(error);
    }
  };

  // 提交修改用户信息
  // 提交修改用户信息
const updateUser = async () => {
  if (!editUser) return;

  // 前端校验
  if (!editUser.userName || editUser.userName.trim() === "") {
    alert("用户名不能为空！");
    return;
  }
  if (!editUser.password || editUser.password.length < 6 || editUser.password.length > 12) {
    alert("密码必须为6到12位！");
    return;
  }
  if (editUser.password !== editUser.confirmedPassword) {
    alert("两次密码输入不一致！");
    return;
  }
  if (!editUser.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(editUser.email)) {
    alert("邮箱格式不正确！");
    return;
  }
  if (!editUser.userAccount || editUser.userAccount.length < 8 || editUser.userAccount.length > 12 || !/^[0-9]+$/.test(editUser.userAccount)) {
    alert("用户账号必须为8到12位数字！");
    return;
  }
  if (!editUser.userIdentity || !/^[0-1]$/.test(editUser.userIdentity)) {
    alert("身份信息必须为0或1！");
    return;
  }

  try {
    const response = await axiosInstance.put("/user/edit", editUser);
    if (response.data.code === 200) {
      alert("用户信息修改成功！");
      setEditUser(null); // 清除编辑状态
      fetchUsers(); // 刷新用户列表
    } else {
      alert("修改失败，请稍后重试！");
    }
  } catch (error) {
    handleError(error);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-management">
      <h1>用户管理</h1>

      <div className="search-sectionUser" style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="请输入用户账号"
          value={searchAccount}
          onChange={(e) => setSearchAccount(e.target.value)}
        />
        <button onClick={searchUser}>搜索用户</button>
        <button onClick={fetchUsers}>显示全部</button>
      </div>

      {loading && <p>加载中...</p>}

      {/* 编辑用户表单 */}
      {editUser && (
  <div className="edit-form">
    <h2>编辑用户</h2>
    <label>
      用户ID（只读）：
      <input type="text" value={editUser.userId} readOnly />
    </label>
    <label>
      用户名：
      <input
        type="text"
        value={editUser.userName}
        onChange={(e) =>
          setEditUser({ ...editUser, userName: e.target.value })
        }
      />
    </label>
    <label>
      密码：
      <input
        type="password"
        defaultValue=""
        onChange={(e) =>
          setEditUser({ ...editUser, password: e.target.value })
        }
      />
    </label>
    <label>
      确认密码：
      <input
        type="password"
        defaultValue=""
        onChange={(e) =>
          setEditUser({ ...editUser, confirmedPassword: e.target.value })
        }
      />
    </label>
    <label>
      邮箱：
      <input
        type="email"
        value={editUser.email}
        onChange={(e) =>
          setEditUser({ ...editUser, email: e.target.value })
        }
      />
    </label>
    <label>
      用户账号：
      <input
        type="text"
        value={editUser.userAccount}
        onChange={(e) =>
          setEditUser({ ...editUser, userAccount: e.target.value })
        }
      />
    </label>
    <label>
      身份信息：
      <input
        type="text"
        value={editUser.userIdentity}
        onChange={(e) =>
          setEditUser({ ...editUser, userIdentity: e.target.value })
        }
      />
    </label>
    <button onClick={updateUser}>提交修改</button>
    <button onClick={() => setEditUser(null)}>取消</button>
  </div>
)}


      {!loading && (
        <table className="user-table">
          <thead>
            <tr>
              <th>用户ID</th>
              <th>用户名</th>
              <th>账号</th>
              <th>状态</th>
              <th>邮箱</th>
              <th>身份</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.userAccount}</td>
                <td>{user.status}</td>
                <td>{user.email}</td>
                <td>{user.userIdentity}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => setEditUser(user)}
                  >
                    修改
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.userId)}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
