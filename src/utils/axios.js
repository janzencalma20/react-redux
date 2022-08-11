import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 100000,
  headers: {
    'Authorization': `JWT ${localStorage.getItem('access')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === 'undefined') {
      alert('A server/network error occurred. Looks like CORS might be the problem');
      return Promise.reject(error);
    }

    if (error.response.status === 401 && originalRequest.url === '/auth/jwt/refresh/') {
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refresh');

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        const now = Math.ceil(Date.now() / 1000);
        if (tokenParts.exp > now) {
          return axiosInstance
            .post('/auth/jwt/refresh/', { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem('access', response.data.access);

              axiosInstance.defaults.headers['Authorization'] = 'JWT ' + response.data.access;
              originalRequest.headers['Authorization'] = 'JWT ' + response.data.access;

              return axiosInstance(originalRequest)
            })
            .catch((err) => {
              console.log(err);
            })
        } else {
          console.log('Refresh token is expired', tokenParts.exp, now);
          window.location.href = '/auth/login';
        }
      } else {
        console.log('Refresh token not available');
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);