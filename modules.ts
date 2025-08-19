import { loadEnv } from "vite";

process.env = {
  ...process.env,
  ...loadEnv(process.env.NODE_ENV || "development", process.cwd()),
};

export default {
  users: process.env.VITE_USERS_URL || "",
  finance: process.env.VITE_FINANCE_URL || "",
};
