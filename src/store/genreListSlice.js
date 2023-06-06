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
      response.data.genres.map((data) => {
        let addedGenre;
        if (data.description === "Action") {
          addedGenre = {
            genre: "Action",
            image:
              "https://images.unsplash.com/photo-1514514188727-ff38e839635e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWN0aW9uJTIwbW92aWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Adventure") {
          addedGenre = {
            genre: "Adventure",
            image:
              "https://images.unsplash.com/photo-1579713899713-bcd3efe713aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Animation") {
          addedGenre = {
            genre: "Animation",
            image:
              "https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Biography") {
          addedGenre = {
            genre: "Biography",
            image:
              "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Comedy") {
          addedGenre = {
            genre: "Comedy",
            image:
              "https://images.unsplash.com/photo-1545580140-ab89a0426d37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Crime") {
          addedGenre = {
            genre: "Crime",
            image:
              "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Documentary") {
          addedGenre = {
            genre: "Documentary",
            image:
              "https://images.unsplash.com/photo-1602545164910-81aecfd1413d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Drama") {
          addedGenre = {
            genre: "Drama",
            image:
              "https://images.unsplash.com/photo-1559781732-eed3e087c660?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Family") {
          addedGenre = {
            genre: "Family",
            image:
              "https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Fantasy") {
          addedGenre = {
            genre: "Fantasy",
            image:
              "https://images.unsplash.com/photo-1560942485-b2a11cc13456?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "History") {
          addedGenre = {
            genre: "History",
            image:
              "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Horror") {
          addedGenre = {
            genre: "Horror",
            image:
              "https://images.unsplash.com/photo-1505635552518-3448ff116af3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Romance") {
          addedGenre = {
            genre: "Romance",
            image:
              "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Sci-Fi") {
          addedGenre = {
            genre: "Sci-Fi",
            image:
              "https://images.unsplash.com/photo-1634634120836-2e9581aba554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Sport") {
          addedGenre = {
            genre: "Sport",
            image:
              "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
          };
          genreList.push(addedGenre);
        } else if (data.description === "Thriller") {
          addedGenre = {
            genre: "Thriller",
            image:
              "https://images.unsplash.com/photo-1523712900580-a5cc2e0112ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
          };
          genreList.push(addedGenre);
        }
      });
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

export const getMovieListForGenre = (genre, setIsLoading) => {
  if (setIsLoading) {
    setIsLoading(true);
  }
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
    if (setIsLoading) {
      setIsLoading(false);
    }
  };
};
