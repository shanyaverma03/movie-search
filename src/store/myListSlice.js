import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

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

export const addToMyListAction = (movie, userId) => {
  return async () => {
    const docRef = await addDoc(collection(db, "mylist"), {
      id: movie.id,
      poster: movie.poster,
      rank: movie.rank,
      title: movie.title,
      userId: userId,
      year: movie.year,
    });

    console.log("Document written with ID: ", docRef.id);
  };
};
