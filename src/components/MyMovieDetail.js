import classes from "./MyMovieDetail.module.css";
import { useNavigate } from "react-router";

const MyMovieDetail = (props) => {
  const navigate = useNavigate();

  const goToListHandler = () => {
    navigate("/mylist");
  };
  return (
    <div className={classes.myMovies}>
      <div className={classes.card}>
        <img src={props.image} alt="thumbnail" />
        <div className={classes.container}>
          <p>{props.rating}</p>
          <p>{props.title}</p>

          <button onClick={goToListHandler}>Go to list</button>
        </div>
      </div>
    </div>
  );
};

export default MyMovieDetail;
