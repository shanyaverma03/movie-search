import classes from "./TopMovieDetail.module.css";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { addToMyListAction } from "../../store/myListSlice";
import { useDispatch } from "react-redux";
import { ReactComponent as Star } from "../../logos/star.svg";
import { ReactComponent as Info } from "../../logos/info.svg";
import { isLoadingActions } from "../../store";
import CircularProgress from "@mui/material/CircularProgress";

const TopMovieDetail = (props) => {
  const [movieAlreadyInList, setAlreadyMovieInList] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated.isAuthenticated
  );
  const userId = useSelector((state) => state.isAuthenticated.userId);
  const myList = useSelector((state) => state.mylist.mylist);
  const isLoading = useSelector((state) => state.isLoading.isLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToListHandler = () => {
    if (isAuthenticated) {
      //add to list
      //turn the isLoading state to true
      dispatch(isLoadingActions.setIsLoading());
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

  const moreInfoIconHandler = () => {
    navigate(`/browse/${props.imdbid}`);
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Star className={classes.starSvg} />
            <p style={{ color: "#FFFFFFB3", height: "1em" }}>{props.rating}</p>
          </div>
          <p className={classes.title}>{props.title}</p>
          <div className={classes.actionAndLearn}>
            {isLoading && (
              <button>
                <CircularProgress />
              </button>
            )}
            {!isLoading && movieAlreadyInList ? (
              <button onClick={goToListHandler}>Go to list</button>
            ) : (
              <button onClick={addToListHandler}>Add to list</button>
            )}
            {isLoading && <CircularProgress />}
            <Info className={classes.info} onClick={moreInfoIconHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMovieDetail;
