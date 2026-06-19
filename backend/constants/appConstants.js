// HTTP Status Codes
const STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
};

// Validation Messages
const VALIDATION_MESSAGES = {
    NAME_REQUIRED: "Name is required",
    EMAIL_INVALID: "Please provide a valid email",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
    PASSWORD_LOWERCASE: "Password must contain a lowercase letter",
    PASSWORD_UPPERCASE: "Password must contain an uppercase letter",
    PASSWORD_NUMBER: "Password must contain a number",
    PASSWORD_REQUIRED: "Password is required",
    ROLE_INVALID: "Invalid role",
};

// Auth Messages
const AUTH_MESSAGES = {
    EMAIL_EXISTS: "An account with this email already exists.",
    REGISTRATION_SUCCESS: "Registration successful",
    LOGIN_SUCCESS: "Login successful",
    LOGIN_INVALID: "Invalid email or password.",
};

// Course Messages
const COURSE_MESSAGES = {
    NOT_FOUND: "Course not found.",
    ALREADY_ENROLLED: "You are already enrolled in this course.",
    ENROLL_SUCCESS: "Successfully enrolled in course.",
    WISHLIST_DUPLICATE: "Course is already in your wishlist.",
    WISHLIST_ADDED: "Added to wishlist.",
    WISHLIST_REMOVED: "Removed from wishlist.",
};

// User Roles
const USER_ROLES = {
    STUDENT: "student",
    INSTRUCTOR: "instructor",
};

// Field Constraints
const FIELD_CONSTRAINTS = {
    NAME_MAX_LENGTH: 100,
    PASSWORD_MIN_LENGTH: 8,
    BCRYPT_SALT_ROUNDS: 12,
};

// Default Values
const DEFAULTS = {
    SORT: "title-asc",
    ROLE: USER_ROLES.STUDENT,
    JWT_EXPIRES_IN: "7d",
};

module.exports = {
    STATUS,
    VALIDATION_MESSAGES,
    AUTH_MESSAGES,
    COURSE_MESSAGES,
    USER_ROLES,
    FIELD_CONSTRAINTS,
    DEFAULTS,
};