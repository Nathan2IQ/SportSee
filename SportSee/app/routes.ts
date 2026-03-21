import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dashboard", "routes/dashboard.jsx"),
  route("profile", "routes/profile.jsx"),
] satisfies RouteConfig;
