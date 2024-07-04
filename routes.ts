// Array of public routes
export const publicRoutes = ["/"];

// Array of routes for authentication purpose  - this routes will redirect logged in users to settings
export const authRoutes = ["/auth/register", "/auth/login", "/auth/error"];

// Routes that start with this prefix are used for API
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
