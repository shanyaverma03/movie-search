import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  movie: { id: "", title: "", year: "", rank: "", poster: "" },
};

const movieSlice = createSlice({
  name: "selectedMovie",
  initialState,
  reducers: {
    select(state, action) {
      state.movie = action.payload;
    },
  },
});

//const store = createStore(movieSlice.reducer);
const store = configureStore({
  reducer: movieSlice.reducer,
});

export const movieActions = movieSlice.actions;
export default store;
