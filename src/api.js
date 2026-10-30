import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to protected requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Refresh expired access tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        localStorage.removeItem("accessToken");
        return Promise.reject(error);
      }

      try {
        // This endpoint must match your Django URL configuration.
        const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// Public post endpoints
export const getPosts = async () => {
  const response = await api.get("/posts/");
  return response.data;
};

export const getPost = async (id) => {
  const response = await api.get(`/post/${id}/`);
  return response.data;
};

export const getLatestPosts = async () => {
  const response = await api.get("/posts/latest");
  return response.data;
};

export const getLastPage = async (x) => {
  const response = await api.get(`/posts/last-page/${x}`);
  return response.data;
};

export const getNextPage = async (x) => {
  const response = await api.get(`/posts/next-page/${x}`);
  return response.data;
};

export const getRecommended = async () => {
  const response = await api.get("/posts/recommended");
  return response.data;
};

export const getTopRecommended = async () => {
  const response = await api.get("/posts/top-recommended");
  return response.data;
};

export const getSimilar = async (id) => {
  const response = await api.get(`/posts/similar/${id}`);
  return response.data;
};

export const getComments = async (id) => {
  const response = await api.get(`/post/${id}/comments`);
  return response.data;
};

export const getSearched = async (query) => {
  const response = await api.get("/search/", {
    params: { q: query },
  });
  return response.data;
};

export const getTopicMovies = async () => {
  const response = await api.get("/topics/movies");
  return response.data;
};

export const getUserProfile = async (id) => {
  const response = await api.get(`/profile/${id}`);
  return response.data;
};

// Protected comment endpoints
export const createComment = (postId, body) =>
  api.post(`/posts/${postId}/comments/create/`, {
    post: postId,
    body,
  });

export const deleteComment = (commentId) =>
  api.delete(`/comments/${commentId}/`);

// Authentication endpoints
export const login = (username, password) =>
  api.post("/auth/login/", { username, password });

export const register = (userData) => api.post("/auth/register/", userData);

export const getCurrentUser = () => api.get("/auth/me/");

export default api;
