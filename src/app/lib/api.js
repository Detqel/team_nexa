const API_BASE = "/api";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "Request failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

import { resizeImageToDataUrl } from "./images";

export const authApi = {
  register: (body) => apiRequest("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  getMe: () => apiRequest("/auth/me"),
  updateProfile: (body) =>
    apiRequest("/auth/me", { method: "PUT", body: JSON.stringify(body) }),
  uploadAvatar: async (file) => {
    const avatar = await resizeImageToDataUrl(file, 400, 400, 0.85);
    return apiRequest("/auth/me", { method: "PUT", body: JSON.stringify({ avatar }) });
  },
  deleteAvatar: () => apiRequest("/auth/me", { method: "PUT", body: JSON.stringify({ avatar: null }) }),
};

export const coursesApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.set(key, String(value));
      }
    });
    const qs = query.toString();
    return apiRequest(`/courses${qs ? `?${qs}` : ""}`);
  },
  getCategories: () => apiRequest("/courses/categories/list"),
  getById: (id) => apiRequest(`/courses/${id}`),
  enroll: (id) => apiRequest(`/courses/${id}/enroll`, { method: "POST" }),
  addToWishlist: (id) => apiRequest(`/courses/${id}/wishlist`, { method: "POST" }),
  removeFromWishlist: (id) => apiRequest(`/courses/${id}/wishlist`, { method: "DELETE" }),
  getEnrolled: () => apiRequest("/courses/enrolled/me"),
  getWishlist: () => apiRequest("/courses/wishlist/me"),
  create: (body) => apiRequest("/courses", { method: "POST", body: JSON.stringify(body) }),
};

export const assignmentsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.set(key, String(value));
      }
    });
    const qs = query.toString();
    return apiRequest(`/assignments${qs ? `?${qs}` : ""}`);
  },
  getById: (id) => apiRequest(`/assignments/${id}`),
  create: (body) =>
    apiRequest("/assignments", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) =>
    apiRequest(`/assignments/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id) => apiRequest(`/assignments/${id}`, { method: "DELETE" }),
  getSubmissions: (id) => apiRequest(`/assignments/${id}/submissions`),
  submit: (id, body) =>
    apiRequest(`/assignments/${id}/submit`, { method: "POST", body: JSON.stringify(body) }),
  gradeSubmission: (assignmentId, submissionId, body) =>
    apiRequest(`/assignments/${assignmentId}/submissions/${submissionId}/grade`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
};
