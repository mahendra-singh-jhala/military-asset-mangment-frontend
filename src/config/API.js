import axios from "axios"

const API_BASE_URL = "https://military-asset-mangment-backend.onrender.com"
const api = axios.create({
    baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("auth"));
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
},
    (error) => Promise.reject(error)
);

export default api;