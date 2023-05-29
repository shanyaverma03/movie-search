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
import LoginFirstModal from "./UI/MyModal";
import { auth } from "../config/firebase";
import { getUidOfUserAction } from "../store/isAuthenticatedSlice";
import { addToMyListAction } from "../store/myListSlice";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import classes from "./MovieDetail.module.css";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import { query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import Grid from "@mui/material/Grid";

const MovieDetail = (props) => {
  const params = useParams();
  const selectedMovie = useSelector((state) => state.selectedMovie.movie);
  const myList = useSelector((state) => state.mylist.mylist);
  const [movieAlreadyInList, setMovieAlreadyInList] = React.useState(false);
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated.isAuthenticated
  );
  const userId = useSelector((state) => state.isAuthenticated.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalDetails, setModalDetails] = React.useState({
    showModal: false,
    modalMessage: "",
    modalTitle: "",
  });

  const video = selectedMovie.title;
  const [videoURL, setVideoURL] = useState("");

  React.useEffect(() => {
    //first check if the movie is already in the list or not
    const indexOfMovie = myList.some((movie) => movie.id === selectedMovie.id);
    if (indexOfMovie) {
      console.log("movie is already in the list");
      setMovieAlreadyInList(true);
    }
    function handleSearch() {
      movieTrailer(video).then((res) => {
        setVideoURL(res);
      });
    }
    handleSearch();
  }, [myList, selectedMovie.id]);

  const learnMoreHandler = () => {
    navigate("learnmore");
  };
  const addToMyListHandler = async () => {
    if (isAuthenticated) {
      console.log(userId);
      const addedMovie = {
        id: selectedMovie.id,
        title: selectedMovie.title,
        year: selectedMovie.year,
        rank: selectedMovie.rank,
        poster: selectedMovie.poster,
        type: selectedMovie.type,
      };
      console.log("added movie");
      console.log(addedMovie);
      dispatch(addToMyListAction(addedMovie, userId, selectedMovie.id));
      navigate("/mylist");
    } else {
      setModalDetails({
        showModal: true,
        modalMessage: "Please login/register first",
        modalTitle: "Want to add the movie to your list?",
      });
    }
  };

  const goToListHandler = () => {
    navigate("/mylist");
  };

  const closeModal = () => {
    setModalDetails({
      showModal: false,
      modalMessage: "",
      modalTitle: "",
    });
  };

  return (
    // <main className={classes.container}>
    //   <div className={classes.movie_header}>
    //     <div className={classes.movie_info}>
    //       <h1>{selectedMovie.title}</h1>
    //       <p>{selectedMovie.type}</p>
    //     </div>
    //     <div className={classes.rating}>
    //       <div>Imdb Rating</div>
    //       <div>the rating</div>
    //     </div>
    //     <div className={classes.rank}>
    //       <div>Rank</div>
    //       <div>{selectedMovie.rank}</div>
    //     </div>
    //   </div>
    //   <section className={classes.graphics}>
    //     <div className={classes.poster}>
    //       <img src={selectedMovie.poster} alt="poster of the movie" />
    //     </div>
    //     <div>
    //       <ReactPlayer url={videoURL} controls={true} />
    //     </div>
    //   </section>
    // </main>

    <div className={classes.container}>
      <LoginFirstModal
        open={modalDetails.showModal}
        message={modalDetails.modalMessage}
        title={modalDetails.modalTitle}
        closeModal={closeModal}
      />
      <div className={classes.card}>
        <img src={selectedMovie.poster} alt="poster of the movie" />
        <div className={classes.insideCard}>
          <h3>{selectedMovie.title}</h3>
          <p>{selectedMovie.rank}</p>
          {movieAlreadyInList ? (
            <Button onClick={goToListHandler}>Go to 'My List'</Button>
          ) : (
            <Button onClick={addToMyListHandler}>Add to 'My List'</Button>
          )}
        </div>
      </div>
      <div>
        <ReactPlayer url={videoURL} controls={true} />
      </div>
    </div>
  );
};

export default MovieDetail;
