import { createSlice } from "@reduxjs/toolkit";

const initialState = { topList: [] };

const topMoviesSlice = createSlice({
  name: "topMoviesSlice",
  initialState,
  reducers: {
    add(state, action) {
      state.mylist.push(action.payload);
    },
  },
});

export default topMoviesSlice;
