import classes from "./TopMovieDetail.module.css";

const TopMovieDetail = (props) => {
  return (
    <div className={classes.topMovies}>
      <div className={classes.card}>
        <img src={props.image} alt="thumbnail" />
        <div className={classes.container}>
          <p>{props.rating}</p>
          <p>{props.title}</p>
          <button>Add to list</button>
          <button>Play trailer</button>
        </div>
      </div>
    </div>
  );
};

export default TopMovieDetail;
