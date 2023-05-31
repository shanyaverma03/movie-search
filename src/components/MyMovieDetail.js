import classes from "./MyMovieDetail.module.css";
import { useNavigate } from "react-router";
import { removeMovieAction } from "../store/myListSlice";
import { useDispatch } from "react-redux";

const MyMovieDetail = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToListHandler = () => {
    navigate("/mylist");
  };

  const removeMovieHandler = () => {
    dispatch(removeMovieAction(props.docId));
  };
  return (
    <div className={classes.myMovies}>
      <div className={classes.card}>
        <img src={props.image} alt="thumbnail" />
        <div className={classes.container}>
          <p>{props.rating}</p>
          <p>{props.title}</p>

          <button onClick={goToListHandler}>Go to list</button>
          <button onClick={removeMovieHandler}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default MyMovieDetail;
