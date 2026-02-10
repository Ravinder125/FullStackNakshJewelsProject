import axios from "axios";

const baseUrl = import.meta.env.BASE_URL as string;

if (!baseUrl) {
    throw new Error("Base Url is missing")
}

const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
