import axios from 'axios';

export const axiosInstance = axios.create({
  // todo
  baseURL:
    import.meta.env.DEV === true
      ? 'https://acbd-121-135-181-41.jp.ngrok.io'
      : import.meta.env.VITE_BACKEND_EP,
  timeout: 5000,
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
});

// todo: sync with backend
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response.status === 401) {
      const refreshToken = localStorage.getItem('refresh-token');
      console.debug('401 occured, axios is now handling');
      if (refreshToken === null) return Promise.reject(error);

      console.debug('try refresh');
      await axiosInstance.post(
        '/refresh',
        JSON.stringify({
          refreshToken,
        })
      );

      console.debug('try original request');
      return axiosInstance(error.config);
    }

    return Promise.reject(error);
  }
);
