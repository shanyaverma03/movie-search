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
    topCast: [{}],
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
    addTopCast(state, action) {
      state.movie = { ...state.movie, topCast: action.payload };
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
    console.log("inside get selected movie details");
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
      let poster;
      if (list.i == null) {
        poster = "not found";
      } else {
        poster = list.i.imageUrl;
      }

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
      dispatch(getSelectedMovieTopCast(movieIdFromParams));
      // });
      if (setIsLoading) {
        setIsLoading(false);
      }
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
      console.log(images);
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

      let description;
      if (response.data.plotSummary == null) {
        description = "Not Found...";
      } else {
        description = response.data.plotSummary.text;
      }

      dispatch(
        movieSlice.actions.addRatingGenresPlot({ rating, genres, description })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const getSelectedMovieTopCast = (movieIdFromParams) => {
  return async (dispatch) => {
    const options = {
      method: "GET",
      url: "https://online-movie-database.p.rapidapi.com/title/get-full-credits",
      params: {
        tconst: movieIdFromParams,
      },
      headers: {
        "X-RapidAPI-Key": apiInfo["X-RapidAPI-Key"],
        "X-RapidAPI-Host": apiInfo["X-RapidAPI-Host"],
      },
    };

    try {
      const response = await axios.request(options);

      const castList = response.data.cast;
      let count = 1;
      let addedCastList = [];
      castList.map((cast) => {
        if (count < 10) {
          let imageUrl;
          if (cast.image.url == null) {
            imageUrl =
              "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fuser-icon-human-person-sign-vector-20444565&psig=AOvVaw1sBcO6GCILU9ilTctHQJ9A&ust=1686727886592000&source=images&cd=vfe&ved=0CBEQjRxqGAoTCMiz5ZXdv_8CFQAAAAAdAAAAABCPAQ";
          } else {
            imageUrl = cast.image.url;
          }
          const name = cast.name;
          const character = cast.characters[0];
          count++;
          console.log(imageUrl);
          console.log(name);
          console.log(character);
          const castDetail = {
            imageUrl,
            name,
            character,
          };
          addedCastList.push(castDetail);
        }
      });
      dispatch(movieSlice.actions.addTopCast(addedCastList));
    } catch (error) {
      console.error(error);
    }
  };
};
