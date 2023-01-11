import axios from 'axios';

export const axiosInstance = axios.create({
  // todo
  baseURL:
    import.meta.env.DEV === true
      ? 'http://localhost:11900'
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
      const refreshToken = localStorage.getItem('');
      if (refreshToken === null) return Promise.reject(error);

      try {
        console.debug('try refresh');
        const refreshResponse = await axiosInstance.post(
          '/refresh',
          JSON.stringify({
            refreshToken,
          })
        );

        localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);

        console.debug('try original request');
        return axiosInstance(error.config);
      } catch (_error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
