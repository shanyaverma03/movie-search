import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./selectedMovieSlice";
import isAuthenticatedSlice from "./isAuthenticatedSlice";
import myListSlice from "./myListSlice";
import topMoviesSlice from "./topMoviesSlice";
import loadingSlice from "./loadingSlice";

const store = configureStore({
  reducer: {
    selectedMovie: movieSlice.reducer,
    isAuthenticated: isAuthenticatedSlice.reducer,
    mylist: myListSlice.reducer,
    topMovies: topMoviesSlice.reducer,
    isLoading: loadingSlice.reducer,
  },
});

export const movieActions = movieSlice.actions;
export const isAuthenticatedActions = isAuthenticatedSlice.actions;
export const myListActions = myListSlice.actions;
export const topMoviesActions = topMoviesSlice.actions;
export const isLoadingActions = loadingSlice.actions;
export default store;
