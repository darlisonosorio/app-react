import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserDetail } from "../models/userDetails";

type LoggedUser = UserDetail | null;

const loadFromLocalStorage = (): LoggedUser => {
  try {
    const stored = localStorage.getItem("loggedUser");
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Error while reading localStorage", err);
    return null;
  }
};

const saveToLocalStorage = (state: LoggedUser) => {
  try {
    if (state) {
      localStorage.setItem("loggedUser", JSON.stringify(state));
    } else {
      localStorage.removeItem("loggedUser");
    }
  } catch (err) {
    console.error("Error while writing localStorage", err);
  }
};

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: loadFromLocalStorage(),
  reducers: {
    setLoggedUser: (_, action: PayloadAction<LoggedUser>) => action.payload,
    clearLoggedUser: () => null,
  },
});

export const { setLoggedUser, clearLoggedUser } = loggedUserSlice.actions;

export const store = configureStore({
  reducer: {
    loggedUser: loggedUserSlice.reducer,
  },
});

store.subscribe(() => {
  const state = store.getState().loggedUser;
  saveToLocalStorage(state);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;