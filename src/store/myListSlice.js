import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { deleteDoc } from "firebase/firestore";
import { isLoadingActions } from "./index";

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
        (movie) => movie.docId !== action.payload
      );
      state.mylist = filtered;
    },
    rewriteList(state, action) {
      state.mylist = action.payload;
    },
  },
});

export default myListSlice;

export const addToMyListAction = (
  movie,
  userId,
  selectedMovieId,
  setIsLoading
) => {
  //check if the movie already exists or not in firestore, add only if it doesn't exist
  if (setIsLoading) {
    setIsLoading(true);
  }
  return async (dispatch) => {
    const q = query(
      collection(db, "mylist"),
      where("userId", "==", userId),
      where("id", "==", selectedMovieId)
    );
    console.log(q);
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("adding movie to the list");
      const addedMovie = {
        id: movie.id,
        poster: movie.poster,
        rank: movie.rank,
        title: movie.title,
        userId: userId,
        year: movie.year,
        type: movie.type,
      };
      console.log(addedMovie);
      const docRef = await addDoc(collection(db, "mylist"), addedMovie);
      console.log("Document written with ID: ", docRef.id);
      const addedMovieWithDocId = { ...addedMovie, docId: docRef.id };
      dispatch(myListSlice.actions.add(addedMovieWithDocId));
      //set is loading back to false
    } else {
      console.log("not empty");
    }
    if (setIsLoading) {
      setIsLoading(false);
    }
  };
};

export const getMovieListAction = (uid) => {
  return async (dispatch) => {
    let list = [];
    const q = query(collection(db, "mylist"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    console.log("inside get movie list action");
    querySnapshot.forEach((doc) => {
      list.push({ ...doc.data(), docId: doc.id });
    });
    dispatch(myListSlice.actions.rewriteList(list));
  };
};

export const removeMovieAction = (docId, setIsLoading) => {
  if (setIsLoading) {
    setIsLoading(true);
    console.log("set is loading set to true");
  }
  return async (dispatch) => {
    console.log("inside remove movie action");
    await deleteDoc(doc(db, "mylist", docId));
    dispatch(myListSlice.actions.remove(docId));
    if (setIsLoading) {
      setIsLoading(false);
      console.log("set is loading set to false");
    }
  };
};
