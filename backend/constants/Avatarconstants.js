// ─────────────────────────────────────────────────────────────────────────
// Fix for review comment: "Don't use hardcoded strings for such values"
// Before (flagged in PR):
//   if (value.length > 3_000_000) throw new Error("Image is too large. ...");
//   if (value.startsWith("/uploads/") || value.startsWith("http://") || value.startsWith("https://")) ...
// After: use the named constants/helpers below (MAX_BASE64_AVATAR_LENGTH,
// AVATAR_TOO_LARGE_MESSAGE, isRemoteOrUploadUrl) instead of literals.
// ─────────────────────────────────────────────────────────────────────────

// Path prefix where uploaded avatar files are served from / stored under.
const AVATAR_UPLOADS_PATH = "/uploads/avatars/";

// Recognized prefixes for "remote or already-uploaded" avatar URLs.
const UPLOADS_URL_PREFIX = "/uploads/";
const HTTP_URL_PREFIX = "http://";
const HTTPS_URL_PREFIX = "https://";

const REMOTE_OR_UPLOAD_PREFIXES = [
  UPLOADS_URL_PREFIX,
  HTTP_URL_PREFIX,
  HTTPS_URL_PREFIX,
];

// Recognized prefix for base64-encoded inline image data URLs.
const DATA_IMAGE_URL_PREFIX = "data:image/";

// 3MB limit (base64-encoded length, not decoded byte size).
const MAX_BASE64_AVATAR_LENGTH = 3_000_000;

const AVATAR_TOO_LARGE_MESSAGE =
  "Image is too large. Please use a smaller photo.";
const INVALID_IMAGE_FORMAT_MESSAGE =
  "Avatar must be a valid image URL or upload.";

const isDataImageUrl = (value) =>
  typeof value === "string" && value.startsWith(DATA_IMAGE_URL_PREFIX);

const isRemoteOrUploadUrl = (value) =>
  typeof value === "string" &&
  REMOTE_OR_UPLOAD_PREFIXES.some((prefix) => value.startsWith(prefix));

const isStoredUploadAvatar = (value) =>
  typeof value === "string" && value.startsWith(AVATAR_UPLOADS_PATH);

module.exports = {
  AVATAR_UPLOADS_PATH,
  UPLOADS_URL_PREFIX,
  HTTP_URL_PREFIX,
  HTTPS_URL_PREFIX,
  REMOTE_OR_UPLOAD_PREFIXES,
  DATA_IMAGE_URL_PREFIX,
  MAX_BASE64_AVATAR_LENGTH,
  AVATAR_TOO_LARGE_MESSAGE,
  INVALID_IMAGE_FORMAT_MESSAGE,
  isDataImageUrl,
  isRemoteOrUploadUrl,
  isStoredUploadAvatar,
};