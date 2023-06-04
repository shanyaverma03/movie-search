import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { apiInfo } from "../config/rapidAPI";

const initialState = {
  movie: {
    id: "",
    title: "",
    year: "",
    rank: "",
    poster: "",
    type: "",
    photos: [],
    rating: "",
    genres: [],
    description: "",
  },
};

const movieSlice = createSlice({
  name: "selectedMovie",
  initialState,
  reducers: {
    select(state, action) {
      state.movie = action.payload;
    },
    addPhotos(state, action) {
      state.movie = { ...state.movie, photos: action.payload };
    },
    addRatingGenresPlot(state, action) {
      state.movie = {
        ...state.movie,
        rating: action.payload.rating,
        genres: action.payload.genres,
        description: action.payload.description,
      };
    },
  },
});

//const store = createStore(movieSlice.reducer);
export default movieSlice;

export const getSelectedMovieDetails = (movieIdFromParams, setIsLoading) => {
  if (setIsLoading) {
    setIsLoading(true);
  }
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
      const list = response.data.d[0];
      console.log(list);

      //list.map((item) => {
      const id = list.id;
      const title = list.l;
      const year = list.y;
      const rank = list.rank;
      const poster = list.i.imageUrl;
      const type = list.qid;
      const movie = {
        id,
        title,
        year,
        rank,
        poster,
        type,
      };
      dispatch(movieSlice.actions.select(movie));
      dispatch(getSelectedMovieRatingGenrePlot(movieIdFromParams));
      dispatch(getSelectedMoviePhotos(movieIdFromParams));
      // });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getSelectedMoviePhotos = (movieIdFromParams) => {
  return async (dispatch) => {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/title/get-images",
      params: {
        tconst: movieIdFromParams,
        limit: "25",
      },
      headers: {
        "X-RapidAPI-Key": apiInfo["X-RapidAPI-Key"],
        "X-RapidAPI-Host": apiInfo["X-RapidAPI-Host"],
      },
    };

    try {
      const response = await axios.request(options);
      const imagesList = response.data.images;
      let images = [];
      imagesList.map((image) => images.push(image.url));
      // console.log(images);
      dispatch(movieSlice.actions.addPhotos(images));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getSelectedMovieRatingGenrePlot = (movieIdFromParams) => {
  return async (dispatch) => {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/title/get-overview-details",
      params: {
        tconst: movieIdFromParams,
        currentCountry: "US",
      },
      headers: {
        "X-RapidAPI-Key": apiInfo["X-RapidAPI-Key"],
        "X-RapidAPI-Host": apiInfo["X-RapidAPI-Host"],
      },
    };

    try {
      const response = await axios.request(options);

      const rating = response.data.ratings.rating;
      const genres = response.data.genres;
      const description = response.data.plotSummary.text;
      console.log(rating);
      console.log(genres);
      console.log(description);
      dispatch(
        movieSlice.actions.addRatingGenresPlot({ rating, genres, description })
      );
    } catch (error) {
      console.error(error);
    }
  };
};
