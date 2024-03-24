import axios from "axios";
import {getTokens} from "../utils/auth/authManager";

const BASE_URL = process.env.REACT_APP_BASE_URL

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosPrivate.interceptors.request.use(config => {
    const token = getTokens()?.access_token;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});