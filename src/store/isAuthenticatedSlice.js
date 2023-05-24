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
    register(state, action) {
      state.isAuthenticated = true;
      state.userId = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userId = null;
    },
  },
});

export default isAuthenticatedSlice;
