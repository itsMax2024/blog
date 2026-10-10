import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem("accessToken", response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

/// public

export const getPosts = async () => {
  let response = await fetch("http://127.0.0.1:8000/api/posts/");
  let data = await response.json();
  return data;
};

export const getPost = async (id) => {
  let response = await fetch(`http://127.0.0.1:8000/api/post/${id}`);
  let data = response.json();
  return data;
};

export const getLatestPosts = async () => {
  const response = await fetch("http://127.0.0.1:8000/api/posts/latest");
  const data = await response.json();
  return data;
};

export const getLastPage = async (x) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/posts/last-page/${x}`,
  );
  const data = await response.json();
  return data;
};

export const getNextPage = async (x) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/posts/last-page/${x}`,
  );
  const data = await response.json();
  return data;
};

export const getRecommended = async () => {
  const response = await fetch("http://127.0.0.1:8000/api/posts/recommended");
  const data = await response.json();

  return data;
};

export const getTopRecommended = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/posts/top-recommended");
  const data = await res.json();

  return data;
};

export const getSimilar = async (id) => {
  const res = await fetch(`http://127.0.0.1:8000/api/posts/similar/${id}`);
  const data = await res.json();
  return data;
};

export const getComments = async (id) => {
  const res = await fetch(`http://127.0.0.1:8000/api/post/${id}/comments`);
  const data = await res.json();
  return data;
};

export const getSearched = async (query) => {
  const res = await fetch(`http://127.0.0.1:8000/api/search/?q=${query}`);
  const data = await res.json();
  return data;
};

export const getTopicMovies = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/topics/movies");
  const data = await res.json();
  return data;
};

//// protected

export const createComment = (postId, body) =>
  api.post(`/posts/${postId}/comments/`, { body });

export const deleteComment = (commentId) =>
  api.delete(`/comments/${commentId}/`);

// Auth endpoints
export const login = (username, password) =>
  api.post("/token/", { username, password });

export const register = (userData) => api.post("/register/", userData);

export const getCurrentUser = () => api.get("/user/");

export default api;
