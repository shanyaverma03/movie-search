import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./selectedMovieSlice";
import isAuthenticatedSlice from "./isAuthenticatedSlice";
import myListSlice from "./myListSlice";

const store = configureStore({
  reducer: {
    selectedMovie: movieSlice.reducer,
    isAuthenticated: isAuthenticatedSlice.reducer,
    mylist: myListSlice.reducer,
  },
});

export const movieActions = movieSlice.actions;
export const isAuthenticatedActions = isAuthenticatedSlice.actions;
export const myListActions = myListSlice.actions;
export default store;
