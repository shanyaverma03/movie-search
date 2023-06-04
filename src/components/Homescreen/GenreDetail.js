import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMovieListForGenre } from "../../store/genreListSlice";

const GenreDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(params.genre);
    dispatch(getMovieListForGenre(params.genre));
  }, []);

  return <h1>genre detail</h1>;
};

export default GenreDetail;
