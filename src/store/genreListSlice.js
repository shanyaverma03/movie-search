import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiInfo } from "../config/rapidAPI";

const initialState = { genreList: [], movieListForEachGenre: [] };

const genreListSlice = createSlice({
  name: "genreListSlice",
  initialState,
  reducers: {
    setGenreList(state, action) {
      state.genreList = action.payload;
    },
  },
});

export default genreListSlice;

export const getGenreList = () => {
  return async (dispatch) => {
    const options = {
      method: "GET",
      url: "https://online-movie-database.p.rapidapi.com/title/list-popular-genres",
      headers: {
        "X-RapidAPI-Key": apiInfo["X-RapidAPI-Key"],
        "X-RapidAPI-Host": apiInfo["X-RapidAPI-Host"],
      },
    };

    try {
      let genreList = [];
      const response = await axios.request(options);
      console.log(response.data);
      response.data.genres.map((data) => genreList.push(data.description));
      console.log(genreList);
      dispatch(genreListSlice.actions.setGenreList(genreList));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getMovieListForGenre = (genre) => {
  return async () => {
    const options = {
      method: "GET",
      url: "https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre",
      params: {
        genre: genre,
        limit: "5",
      },
      headers: {
        "X-RapidAPI-Key": apiInfo["X-RapidAPI-Key"],
        "X-RapidAPI-Host": apiInfo["X-RapidAPI-Host"],
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      //above data is in the form- /title/tt5433140/

      let movieIdsList = [];
      response.data.map((movieStr) => {
        movieIdsList.push(
          movieStr
            .substring(
              movieStr.indexOf("/title/") + 1,
              movieStr.lastIndexOf("/")
            )
            .substring(6)
        );
      });
      console.log(movieIdsList);
    } catch (error) {
      console.error(error);
    }
  };
};
