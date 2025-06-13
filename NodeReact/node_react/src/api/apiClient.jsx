import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: api_url
});

export default apiClient;
