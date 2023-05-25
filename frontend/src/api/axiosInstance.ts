import axios from "axios";

const API_DOMAIN = process.env.NEXT_PUBLIC_ENV_API_DOMAIN;
const API_URL = process.env.NEXT_PUBLIC_ENV_API_URL;

const instance = axios.create({
  baseURL: API_URL, // 도메인 허용
});

export default instance;
