import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000' ?? import.meta.env.VITE_API_URL,
});

api.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`;

// Добавляем интерцептор для повторного отправки запроса при получении кода ответа 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Здесь вы можете добавить код для обновления токена
      // Например, сделать запрос на сервер для получения нового токена
      // const refreshTokenResponse = await axios.post('/auth/refresh-token', { refreshToken: localStorage.getItem('refreshToken') });
      // localStorage.setItem('token', refreshTokenResponse.data.token);

      // Обновляем токен в заголовке запроса
      api.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`;

      // Повторяем запрос
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
