import axios from "axios";

const HEADERS = {
  "Content-Type": "application/json",
  accept: "application/json",
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: HEADERS,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  return config;
});

export const API = {
  async postReg(dataForm) {
    return instance
      .post(`/auth/register/`, { ...dataForm })
      .then((response) => response.data);
  },
  async postLogin(dataForm) {
    return instance
      .post(`/auth/login/`, { ...dataForm })
      .then((response) => response.data);
  },
  async getUsers() {
    return instance.get(`/users`).then((response) => response.data);
  },
  async removeUser(id) {
    return instance.delete(`/users/${id}`).then((response) => response.data);
  },
  async blockUser(id) {
    return instance
      .patch(`/users/block/${id}`)
      .then((response) => response.data);
  },
  async unblockUser(id) {
    return instance
      .patch(`/users/unblock/${id}`)
      .then((response) => response.data);
  },
};
