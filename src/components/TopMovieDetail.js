import classes from "./TopMovieDetail.module.css";
import Button from "./UI/Button";

const TopMovieDetail = (props) => {
  return (
    <div className={classes.topMovies}>
      <div className={classes.card}>
        <img src={props.image} alt="thumbnail" />
        <div className={classes.container}>
          <p>{props.rating}</p>
          <p>{props.title}</p>
          <button>Add to list</button>

          <div>Trailer</div>
          <div>logo</div>
        </div>
      </div>
    </div>
  );
};

export default TopMovieDetail;
