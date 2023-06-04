import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { removeMovieAction } from "../store/myListSlice";
import { useEffect } from "react";
import { getListAction } from "../store/myListSlice";
import { getUidOfUserAction } from "../store/isAuthenticatedSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { db } from "../config/firebase";
import { getMovieListAction } from "../store/myListSlice";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import classes from "./MyList.module.css";

const MyList = () => {
  //const myList = useSelector((state) => state.mylist.mylist);
  const userId = useSelector((state) => state.isAuthenticated.userId);
  const myList = useSelector((state) => state.mylist.mylist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      console.log(userId);
      console.log(myList);
    } else {
      navigate("/");
    }
  }, []);

  const removeMovieHandler = (docId) => {
    dispatch(removeMovieAction(docId));
  };

  let mainContent;
  if (myList.length === 0) {
    mainContent = (
      <div className={classes.listIsEmpty}>
        <h2>Your List is currently empty</h2>
        <p>
          Add movies and shows that you want to watch by clicking Add to List
        </p>
      </div>
    );
  } else {
    mainContent = myList.map((movie) => (
      <Card key={movie.id} sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          sx={{ height: 500 }}
          image={movie.poster}
          title="movie-detail"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rank: {movie.rank}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Something about the movie- to figure out
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => removeMovieHandler(movie.docId)}>
            Remove from list
          </Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    ));
  }

  return (
    <>
      <h1 className={classes.listHeader}>My List</h1>

      {mainContent}
    </>
  );
};

export default MyList;
