export function getUserAvatarUrl(user) {
  if (user?.avatar) {
    if (user.avatar.startsWith("data:")) return user.avatar;
    const version = user.updatedAt ? new Date(user.updatedAt).getTime() : Date.now();
    const separator = user.avatar.includes("?") ? "&" : "?";
    return `${user.avatar}${separator}v=${version}`;
  }
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || "user")}`;
}

export function getUserInitials(user, fallback = "U") {
  const name = user?.name?.trim();
  if (!name) return fallback[0]?.toUpperCase() || "U";
  const parts = name.split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
  return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase();
}
