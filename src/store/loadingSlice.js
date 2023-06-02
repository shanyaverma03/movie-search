import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoading: false };

const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = true;
    },
    setNotLoading(state) {
      state.isLoading = false;
    },
  },
});

export default loadingSlice;
