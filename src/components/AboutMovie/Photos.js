import { getSelectedMovieDetails } from "../../store/selectedMovieSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

const Photos = () => {
  const selectedMovie = useSelector((state) => state.selectedMovie.movie);
  const photos = selectedMovie.photos;
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    console.log(params.id);
    dispatch(getSelectedMovieDetails(params.id));
    console.log(selectedMovie);
  }, []);
  return (
    <>
      <h1>Pics</h1>
      {photos && photos.map((pic) => <img src={pic} />)}
    </>
  );
};

export default Photos;
