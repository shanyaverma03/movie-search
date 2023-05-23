import { createSlice } from "@reduxjs/toolkit";

const initialState = { mylist: [] };

const myListSlice = createSlice({
  name: "myListSlice",
  initialState,
  reducers: {
    add(state, action) {
      state.mylist.push(action);
    },
  },
});

export default myListSlice;
