import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";

const initialState = { isAuthenticated: false };

const isAuthenticatedSlice = createSlice({
  name: "isAuthenticated",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    register(state) {
      state.isAuthenticated = true;
    },
  },
});

export default isAuthenticatedSlice;
export const getUidOfUserAction = () => {
  return async () => {
    const userId = await auth.currentUser.uid;
    return userId;
  };
};
