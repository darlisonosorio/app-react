import axios from "axios";
import { store, type RootState } from "../store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const state: RootState = store.getState();
  const loggedUser = state.loggedUser;

  if (loggedUser && loggedUser.token) {
    config.headers.Authorization = `Bearer ${loggedUser.token}`;
  }

  return config;
});

export default api;
