// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8088/user';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 用户注册
export const registerUser = (userData) => {
  return api.post('/register', userData);
};

// 用户登录
export const loginUser = (userData) => {
  return api.post('/login', userData);
};

// 查询用户
export const getUser = (userAccount) => {
  return api.get(`/userAccount?userAccount=${userAccount}`);
};

// 修改用户信息
export const updateUser = (userData) => {
  return api.put('/edit', userData);
};

// 删除用户
export const deleteUser = (userId) => {
  return api.delete(`/delete/${userId}`);
};

export default api;
