export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export function setAuth(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function isAuthenticated() {
  return Boolean(getToken() && getUser());
}

export function logout() {
  clearAuth();
  window.location.href = "/login";
}

export function updateStoredUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
