import { createSlice } from "@reduxjs/toolkit";

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
