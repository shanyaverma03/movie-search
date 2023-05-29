import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { apiInfo } from "../config/rapidAPI";

const initialState = {
  movie: { id: "", title: "", year: "", rank: "", poster: "", type: "" },
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
export default movieSlice;

export const getSelectedMovieDetails = (movieIdFromParams) => {
  return async (dispatch) => {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/auto-complete",
      params: { q: movieIdFromParams },
      headers: {
        "X-RapidAPI-Key": apiInfo["X-RapidAPI-Key"],
        "X-RapidAPI-Host": apiInfo["X-RapidAPI-Host"],
      },
    };

    try {
      console.log(movieIdFromParams);
      const response = await axios.request(options);
      const list = response.data.d;
      console.log(list);
      list.map((item) => {
        const id = item.id;
        const title = item.l;
        const year = item.y;
        const rank = item.rank;
        const poster = item.i.imageUrl;
        const type = item.qid;
        const movie = {
          id,
          title,
          year,
          rank,
          poster,
          type,
        };
        dispatch(movieSlice.actions.select(movie));
      });
    } catch (err) {
      console.log(err);
    }
  };
};
