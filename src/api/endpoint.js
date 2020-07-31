export const BASE_URL = "http://127.0.0.1:8000";
export const URL_ENDPOINT = {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    PROFILE: "/api/auth/profile",
    LOGOUT: "/api/auth/logout",
    REFRESH_TOKEN: "/api/auth/refresh",
    USER: "/api/user",
    RESET_PASSWORD: "/api/user/reset-password",
    CHANGE_PASSWORD: "/api/user/change-password"
}
export const METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

export const HTTP_CODES = {
    SUCCESS: "200",
    CREATED: "201",
    ERROR_VALIDATION: "422"
}