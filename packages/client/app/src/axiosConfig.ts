import axios from 'axios';
import { localRefreshToken } from './Login/atoms/refreshTokenAtom';

export const axiosInstance = axios.create({
  // todo
  baseURL: import.meta.env.VITE_BACKEND_EP,
  timeout: 5000,
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      const refreshToken = localRefreshToken.get();

      console.debug('401 occured, axios is now handling');
      if (refreshToken === null) {
        return Promise.reject(error);
      }

      // todo: test here
      console.debug('try refresh');
      // try {
      await axiosInstance.post(
        '/refresh',
        JSON.stringify({
          refreshToken,
        })
      );
      // } catch (second_error) {
      //   return Promise.reject(error);
      // }

      console.debug('try original request');
      return axiosInstance(error.config);
    }

    return Promise.reject(error);
  }
);
