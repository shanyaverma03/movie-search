import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

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
  },
});

export default isAuthenticatedSlice;

export const logoutAction = () => {
  return async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("error");
    }
  };
};
