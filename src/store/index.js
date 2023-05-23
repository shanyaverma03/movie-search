import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./selectedMovieSlice";

const store = configureStore({
  reducer: movieSlice.reducer,
});

export const movieActions = movieSlice.actions;
export default store;
