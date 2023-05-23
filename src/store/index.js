import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./selectedMovieSlice";
import isAuthenticatedSlice from "./isAuthenticatedSlice";

const store = configureStore({
  reducer: {
    selectedMovie: movieSlice.reducer,
    isAuthenticated: isAuthenticatedSlice.reducer,
  },
});

export const movieActions = movieSlice.actions;
export const isAuthenticatedActions = isAuthenticatedSlice.actions;
export default store;
