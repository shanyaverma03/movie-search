import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMovieListForGenre } from "../../store/genreListSlice";
import { useSelector } from "react-redux";

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
    <>
      <h1>genre detail</h1>
      {/* {genreList.length === 0 ? (
        <p>zero</p>
      ) : (
        genreList.map((list) => <p key={list.id}>{list.title}</p>)
      )} */}
    </>
  );
};

export default GenreDetail;
