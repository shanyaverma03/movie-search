import { getSelectedMovieDetails } from "../../store/selectedMovieSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import classes from "./Photos.module.css";
import { CircularProgress } from "@mui/material";

const Photos = () => {
  const selectedMovie = useSelector((state) => state.selectedMovie.movie);
  const photos = selectedMovie.photos;
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("inside photos use effect");

    dispatch(getSelectedMovieDetails(params.id, setIsLoading));
  }, []);

  let content;

  if (isLoading) {
    console.log("I am in loading");
    content = (
      <div className={classes.loading}>
        {" "}
        <h1>Loading...</h1>
        <CircularProgress />;
      </div>
    );
  } else {
    content = (
      <>
        <div className={classes.photosHeader}>
          <img src={selectedMovie.poster} alt="poster of the movie" />
          <div className={classes.movieInfo}>
            <h3>{selectedMovie.title}</h3>
            <h1>Photo Gallery</h1>
          </div>
        </div>
        {isLoading ? (
          <div className={classes.loading}>
            {" "}
            <h1>Loading...</h1>
            <CircularProgress />;
          </div>
        ) : (
          <div style={{ paddingTop: "2em" }}>
            {photos &&
              photos.map((pic) => (
                <img
                  className={classes.image}
                  src={pic}
                  alt="pic from the movie"
                />
              ))}
          </div>
        )}
        ;
      </>
    );
  }
  return <div>{content}</div>;
};

export default Photos;
