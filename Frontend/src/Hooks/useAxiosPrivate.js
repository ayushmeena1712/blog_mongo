import { useEffect } from 'react';
import {axiosPrivate} from '../axiosInstance.js';
import useRefreshToken from './useRefreshToken';
import {useAuth} from '../Authcontext.jsx';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    console.log('Setting up interceptors');
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        console.log('Request interceptor triggered');
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
          console.log('Added Authorization header to request:', config.headers['Authorization']);
        }
        return config;
      },
      
      error => {
        console.log('Error in response interceptor:', error.message);
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => {
        console.log('Response interceptor triggered');
        return response;
      },
      async error => {
        console.log('Error in response interceptor:', error.message);
        const prevRequest = error?.config;
        console.log(error?.response?.status)
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log('Access token expired, attempting to refresh token');
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          console.log('Retrying request with new access token');
          return axiosPrivate(prevRequest);
        }else{
          console.log('Failed to refresh access token');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
