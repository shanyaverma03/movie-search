import classes from "./TopMovieDetail.module.css";
import Button from "./UI/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { addToMyListAction } from "../store/myListSlice";
import { useDispatch } from "react-redux";

const TopMovieDetail = (props) => {
  const [movieAlreadyInList, setAlreadyMovieInList] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated.isAuthenticated
  );
  const userId = useSelector((state) => state.isAuthenticated.userId);
  const myList = useSelector((state) => state.mylist.mylist);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToListHandler = () => {
    if (isAuthenticated) {
      //add to list

      const movieToBeAdded = {
        id: props.imdbid,
        poster: props.image,
        rank: props.rank,
        title: props.title,
        userId: userId,
        year: props.year,
        type: props.genre,
      };
      dispatch(addToMyListAction(movieToBeAdded, userId, movieToBeAdded.id));
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
    } else {
      setAlreadyMovieInList(false);
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
