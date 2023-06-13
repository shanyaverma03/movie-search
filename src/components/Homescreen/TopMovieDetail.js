import classes from "./TopMovieDetail.module.css";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { addToMyListAction } from "../../store/myListSlice";
import { useDispatch } from "react-redux";
import { ReactComponent as Star } from "../../logos/star.svg";
import { ReactComponent as Info } from "../../logos/info.svg";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const TopMovieDetail = (props) => {
  const [movieAlreadyInList, setAlreadyMovieInList] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated.isAuthenticated
  );
  const userId = useSelector((state) => state.isAuthenticated.userId);
  const myList = useSelector((state) => state.mylist.mylist);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const addToListHandler = () => {
    if (isAuthenticated) {
      //add to list
      //turn the isLoading state to true

      const movieToBeAdded = {
        id: props.imdbid,
        poster: props.image,
        rank: props.rank,
        title: props.title,
        userId: userId,
        year: props.year,
        type: props.genre,
      };

      

      dispatch(
        addToMyListAction(
          movieToBeAdded,
          userId,
          movieToBeAdded.id,
          setIsLoading
        )
      );
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
    console.log(props.title);
    console.log(props.image);
    const indexOfMovie = myList.some((movie) => movie.title === props.title);
    if (indexOfMovie) {
      //movie already in the list
      setAlreadyMovieInList(true);
      console.log("movie in list");
    } else {
      setAlreadyMovieInList(false);
      console.log("movie not in list");
    }
  }, [myList, props.title]);

  let buttonContent;

  if (isLoading) {
    buttonContent = <CircularProgress />;
  } else {
    if (movieAlreadyInList) {
      buttonContent = "Go to List";
    } else {
      buttonContent = "Add to List";
    }
  }
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
          <Link to={`/browse/${props.imdbid}`} className={classes.title}>
            {props.title}
          </Link>

          <div className={classes.actionAndLearn}>
            {buttonContent === "Go to List" ? (
              <button onClick={goToListHandler}>{buttonContent}</button>
            ) : (
              <button onClick={addToListHandler}>{buttonContent}</button>
            )}
            <Info className={classes.info} onClick={moreInfoIconHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMovieDetail;
