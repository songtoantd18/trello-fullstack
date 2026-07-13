// src/config.js
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const BASE_URL = isLocalhost ? "http://localhost:3000" : "https://nestjs-x204.onrender.com";

export default {
  BASE_URL,
  API: {
    LOGIN: `${BASE_URL}/user/login`,
    REGISTER: `${BASE_URL}/user/register`,
    CURRENT_USER: `${BASE_URL}/user/curent-user`,
    SELECT_POST: `${BASE_URL}/post/select`,
    CREATE_POST: `${BASE_URL}/post`,
    SELECT_COMMENT: `${BASE_URL}/comment/post`,
    CREATE_COMMENT: `${BASE_URL}/comment`,
    TITLE_COMMENT: `${BASE_URL}/post`,
    SHOW_ALL_USER: `${BASE_URL}/user/select`,
    SHOW_ALL_POST: `${BASE_URL}/post/all`,
    SHOW_ALL_COMMENT: `${BASE_URL}/comment/all`,
  },
};
