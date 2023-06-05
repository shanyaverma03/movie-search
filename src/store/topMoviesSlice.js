import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { imdbApiInfo } from "../config/rapidAPI";

const initialState = { topList: [] };

const topMoviesSlice = createSlice({
  name: "topMoviesSlice",
  initialState,
  reducers: {
    add(state, action) {
      state.topList.push(action.payload);
    },
  },
});

export default topMoviesSlice;

export const getTopMoviesAndAdd = () => {
  return async (dispatch) => {
    const options = {
      method: "GET",
      url: "https://imdb-top-100-movies.p.rapidapi.com/",
      headers: {
        "X-RapidAPI-Key": imdbApiInfo["X-RapidAPI-Key"],
        "X-RapidAPI-Host": imdbApiInfo["X-RapidAPI-Host"],
      },
    };
    let count = 1;
    try {
      const response = await axios.request(options);
      let topList = [];
      const responseList = response.data;
      responseList.map((movie) => {
        if (count < 20) {
          const imdbid = movie.imdbid;
          const description = movie.description;
          const genre = movie.genre;
          const rank = movie.rank;
          const rating = movie.rating;
          const thumbnail = movie.thumbnail;
          const title = movie.title;
          const trailer = movie.trailer;
          const year = movie.year;
          const image = movie.image;

          const addedMovie = {
            imdbid,
            description,
            genre,
            rank,
            rating,
            thumbnail,
            title,
            trailer,
            year,
            image,
          };

          dispatch(topMoviesSlice.actions.add(addedMovie));
          console.log(addedMovie);
          count++;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
};
