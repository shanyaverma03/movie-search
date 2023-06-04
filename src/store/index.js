import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./selectedMovieSlice";
import isAuthenticatedSlice from "./isAuthenticatedSlice";
import myListSlice from "./myListSlice";
import topMoviesSlice from "./topMoviesSlice";
import genreListSlice from "./genreListSlice";

const store = configureStore({
  reducer: {
    selectedMovie: movieSlice.reducer,
    isAuthenticated: isAuthenticatedSlice.reducer,
    mylist: myListSlice.reducer,
    topMovies: topMoviesSlice.reducer,
    genreList: genreListSlice.reducer,
  },
});

export const movieActions = movieSlice.actions;
export const isAuthenticatedActions = isAuthenticatedSlice.actions;
export const myListActions = myListSlice.actions;
export const topMoviesActions = topMoviesSlice.actions;
export const genreListActions = genreListSlice.actions;
export default store;
