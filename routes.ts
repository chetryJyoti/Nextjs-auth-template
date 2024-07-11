// Array of public routes
export const publicRoutes = ["/", "/auth/new-verification"];

// Array of routes for authentication purpose  - this routes will redirect logged in users to settings
export const authRoutes = [
  "/auth/register",
  "/auth/login",
  "/auth/error",
  "/auth/reset-password",
  "/auth/new-password"
];

// Routes that start with this prefix are used for API
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
