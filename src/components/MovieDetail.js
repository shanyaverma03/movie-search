import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { myListActions, isAuthenticatedActions } from "../store/index";
import { useDispatch } from "react-redux";
import LoginFirstModal from "./UI/LoginFirstModal";
import { auth } from "../config/firebase";
import { getUidOfUserAction } from "../store/isAuthenticatedSlice";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const MovieDetail = () => {
  const params = useParams();
  const selectedMovie = useSelector((state) => state.selectedMovie.movie);
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated.isAuthenticated
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);

  const learnMoreHandler = () => {
    navigate("learnmore");
  };

  const addToMyListHandler = async () => {
    if (isAuthenticated) {
      const addedMovie = {
        id: selectedMovie.id,
        title: selectedMovie.title,
        year: selectedMovie.year,
        rank: selectedMovie.rank,
        poster: selectedMovie.poster,
      };
      const userId = await dispatch(getUidOfUserAction());
      console.log(userId);
      const docRef = await addDoc(collection(db, "mylist"), {
        id: addedMovie.id,
        poster: addedMovie.poster,
        rank: addedMovie.rank,
        title: addedMovie.title,
        userId,
        year: addedMovie.year,
      });
      console.log("Document written with ID: ", docRef.id);
      dispatch(myListActions.add(addedMovie));

      navigate("/mylist");
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <h1>Movie detail</h1>
      <p>{params.id}</p>
      <LoginFirstModal open={showModal} closeModal={closeModal} />
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          sx={{ height: 500 }}
          image={selectedMovie.poster}
          title="movie-detail"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {selectedMovie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rank: {selectedMovie.rank}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Something about the movie- to figure out
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={addToMyListHandler}>
            Add to 'My List'
          </Button>
          <Button size="small" onClick={learnMoreHandler}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default MovieDetail;
