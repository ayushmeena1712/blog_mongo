import axios from 'axios';
import useAxiosPrivate from './usePrivateAxios';
const BASE_URL = https://blog-mongo.onrender.com;

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

