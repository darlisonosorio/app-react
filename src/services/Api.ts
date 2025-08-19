import axios from "axios";
import { store, type RootState } from "../store";
import { VITE_API_URL } from "../constants";

const api = axios.create({
  baseURL: VITE_API_URL,
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
