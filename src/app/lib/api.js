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

export const authApi = {
  register: (body) => apiRequest("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  getMe: () => apiRequest("/auth/me"),
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
};
