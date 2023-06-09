import classes from "./MyMovieDetail.module.css";
import { useNavigate } from "react-router";
import { removeMovieAction } from "../../store/myListSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const MyMovieDetail = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const goToListHandler = () => {
    navigate("/mylist");
  };

  const removeMovieHandler = () => {
    dispatch(removeMovieAction(props.docId, setIsLoading));
  };

  return (
    <div className={classes.myMovies}>
      <div className={classes.card}>
        <img src={props.image} alt="thumbnail" />
        <div className={classes.container}>
          <Link to={`/browse/${props.id}`} className={classes.title}>
            {props.title}
          </Link>

          <button onClick={goToListHandler}>Go to list</button>
          {isLoading ? (
            <button>
              <CircularProgress />
            </button>
          ) : (
            <button onClick={removeMovieHandler}>Remove</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMovieDetail;
