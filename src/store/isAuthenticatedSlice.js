import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";

const initialState = { isAuthenticated: false, userId: null };

const isAuthenticatedSlice = createSlice({
  name: "isAuthenticated",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userId = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    register(state) {
      state.isAuthenticated = true;
      state.userId = action.payload;
    },
  },
});

export default isAuthenticatedSlice;
