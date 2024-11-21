import axios from 'axios';
import useAxiosPrivate from './usePrivateAxios';
const BASE_URL = import.meta.env.VITE_URL_PATH_BACKEND;

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

