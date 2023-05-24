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

export const addToMyListAction = (movie, userId, selectedMovieId) => {
  //check if the movie already exists or not in firestore, add only if it doesn't exist

  return async (dispatch) => {
    const q = query(
      collection(db, "mylist"),
      where("id", "==", selectedMovieId)
    );
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
      };
      const docRef = await addDoc(collection(db, "mylist"), addedMovie);
      console.log("Document written with ID: ", docRef.id);
      dispatch(myListSlice.actions.add(addedMovie));
    }
  };
};

// export const getMovieListAction = async (id) => {
//   const list = [];
//   const q = query(collection(db, "mylist"), where("userId", "==", id));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     list.push({ ...doc.data(), id: doc.id });
//     //console.log(list)
//   });
//   console.log(list);
//   setMyList(list);
// };
