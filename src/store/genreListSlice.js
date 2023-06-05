import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiInfo } from "../config/rapidAPI";
import { imdbApiInfo } from "../config/rapidAPI";

const initialState = { genreList: [], movieListForEachGenre: [] };

const genreListSlice = createSlice({
  name: "genreListSlice",
  initialState,
  reducers: {
    setGenreList(state, action) {
      state.genreList = action.payload;
    },
    setMovieListForGenre(state, action) {
      state.movieListForEachGenre = action.payload;
    },
  },
});

export default genreListSlice;

export const getGenreList = (setIsLoading) => {
  if (setIsLoading) {
    setIsLoading(true);
  }
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

    if (setIsLoading) {
      setIsLoading(false);
    }
  };
};

export const getMovieListForGenre = (genre) => {
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

          topList.push(addedMovie);

          count++;
        }
      });
      console.log(topList);
      let genreList = [];
      topList.map((movie) => {
        if (movie.genre.includes(genre)) {
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

          genreList.push(addedMovie);
        }
      });
      console.log(genreList);
      dispatch(genreListSlice.actions.setMovieListForGenre(genreList));
    } catch (error) {
      console.error(error);
    }
  };
};
