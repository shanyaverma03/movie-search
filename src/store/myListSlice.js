import { createSlice } from "@reduxjs/toolkit";

const initialState = { mylist: [] };

const myListSlice = createSlice({
  name: "myListSlice",
  initialState,
  reducers: {
    add(state, action) {
      state.mylist.push(action.payload);
    },
    remove(state, action) {
      const filtered = state.mylist.filter(
        (movie) => movie.id !== action.payload
      );
      state.mylist = filtered;
    },
  },
});

export default myListSlice;
