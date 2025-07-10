export const BASE_URL = "https://community-hub-cl2g.onrender.com/";

// Use the correct BASE_URL for development or production
// export const BASE_URL = "http://localhost:8000"; // Use localhost for local development or the production URL if deployed

export const USER_LOGIN_API = "/api/auth/login";
export const USER_SIGNUP = "/api/auth/register";
export const USER_FORGET_PASSWORD = "/api/auth/forgot-password";
export const getUserFeedEndpoint = "/api/feed";
export const getUserDetailsEndpoint = "/api/users/me";
export const offerHelpEndpoint = "/api/offers";
export const requestHelpEndpoint = "/api/requests";
export const forgetPassword = `${BASE_URL}/api/auth/forgot-password`;
export const userLogin = "/api/auth/login";
export const getProfileDetails = "/api/users/me";
export const resetPasswordEndpoint = `${BASE_URL}/api/auth/reset-password`;
export const updateUserDetails = "/api/users/me";
