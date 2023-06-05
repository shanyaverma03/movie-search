import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMovieListForGenre } from "../../store/genreListSlice";
import { useSelector } from "react-redux";
import TopMovieDetail from "./TopMovieDetail";
import classes from "./GenreDetail.module.css";

const GenreDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const genreList = useSelector(
    (state) => state.genreList.movieListForEachGenre
  );
  const topMoviesList = useSelector((state) => state.topMovies.topList);

  useEffect(() => {
    console.log(params.genre);
    dispatch(getMovieListForGenre(params.genre, topMoviesList));
  }, []);

  return (
    <div className={classes.genreHeader}>
      <h1>{params.genre}</h1>
      {genreList &&
        genreList.map((topMovie) => (
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
        ))}
    </div>
  );
};

export default GenreDetail;
