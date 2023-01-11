import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_EP,
  timeout: 3000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((request) => {
  if (
    request.method === 'post' &&
    request.headers?.hasContentType !== undefined
  ) {
    request.headers.setContentType = 'application/json; charset=utf-8';
  }

  return request;
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
