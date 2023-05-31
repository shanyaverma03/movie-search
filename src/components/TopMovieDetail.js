import classes from "./TopMovieDetail.module.css";
import Button from "./UI/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const TopMovieDetail = (props) => {
  const [movieAlreadyInList, setAlreadyMovieInList] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated.isAuthenticated
  );
  const myList = useSelector((state) => state.mylist.mylist);
  const navigate = useNavigate();

  const addToListHandler = () => {
    if (isAuthenticated) {
      //add to list
    } else {
      navigate("/login");
    }
  };

  const goToListHandler = () => {
    navigate("/mylist");
  };

  useEffect(() => {
    const indexOfMovie = myList.some((movie) => movie.title === props.title);
    if (indexOfMovie) {
      //movie already in the list
      setAlreadyMovieInList(true);
    }
  }, [myList, props.title]);

  return (
    <div className={classes.topMovies}>
      <div className={classes.card}>
        <img src={props.image} alt="thumbnail" />
        <div className={classes.container}>
          <p>{props.rating}</p>
          <p>{props.title}</p>
          {movieAlreadyInList ? (
            <button onClick={goToListHandler}>Go to list</button>
          ) : (
            <button onClick={addToListHandler}>Add to list</button>
          )}

          <div>Trailer</div>
          <div>logo</div>
        </div>
      </div>
    </div>
  );
};

export default TopMovieDetail;
