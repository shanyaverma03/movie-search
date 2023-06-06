import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMovieListForGenre } from "../../store/genreListSlice";
import { useSelector } from "react-redux";
import TopMovieDetail from "./TopMovieDetail";
import classes from "./GenreDetail.module.css";
import { CircularProgress } from "@mui/material";

const GenreDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const genreList = useSelector(
    (state) => state.genreList.movieListForEachGenre
  );
  const topMoviesList = useSelector((state) => state.topMovies.topList);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(params.genre);
    dispatch(getMovieListForGenre(params.genre, setIsLoading));
  }, []);

  let content;
  if (isLoading) {
    content = (
      <div className={classes.loading}>
        {" "}
        <h1>Loading...</h1>
        <CircularProgress />;
      </div>
    );
  } else {
    if (genreList && genreList.length === 0) {
      content = (
        <div className={classes.movieNotFound}>
          {" "}
          <h3>Oops! No {params.genre} movie found!</h3>
          <p>Please try again later...</p>
        </div>
      );
    }

    if (genreList && genreList.length > 0) {
      content = genreList.map((topMovie) => (
        <TopMovieDetail
          key={topMovie.imdbid}
          imdbid={topMovie.imdbid}
          description={topMovie.description}
          genre={topMovie.genre}
          rank={topMovie.rank}
          rating={topMovie.rating}
          thumbnail={topMovie.thumbnail}
          title={topMovie.title}
          trailer={topMovie.trailer}
          year={topMovie.year}
          image={topMovie.image}
        />
      ));
    }
  }
  return (
    <div className={classes.genreHeader}>
      <h1>{params.genre}</h1>
      {content}
    </div>
  );
};

export default GenreDetail;
