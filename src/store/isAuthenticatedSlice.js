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
  },
});

export default isAuthenticatedSlice;
