import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import LoginFirstModal from "../UI/MyModal";
import { addToMyListAction } from "../../store/myListSlice";
import classes from "./MovieDetail.module.css";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import { useState } from "react";
import { getSelectedMovieDetails } from "../../store/selectedMovieSlice";
import { useEffect } from "react";
import { ReactComponent as Images } from "../../logos/images.svg";
import { ReactComponent as Plus } from "../../logos/plus.svg";
import { ReactComponent as Tick } from "../../logos/tick.svg";
import { CircularProgress } from "@mui/material";
import { removeMovieAction } from "../../store/myListSlice";

const MovieDetail = () => {
  const params = useParams();
  const selectedMovie = useSelector((state) => state.selectedMovie.movie);
  const myList = useSelector((state) => state.mylist.mylist);
  const [movieAlreadyInList, setMovieAlreadyInList] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated.isAuthenticated
  );
  const userId = useSelector((state) => state.isAuthenticated.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalDetails, setModalDetails] = useState({
    showModal: false,
    modalMessage: "",
    modalTitle: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const video = selectedMovie.title;
  const [videoURL, setVideoURL] = useState("");

  const paramsMovieId = useParams();

  useEffect(() => {
    //first check if the movie is already in the list or not

    console.log(paramsMovieId);
    const indexOfMovie = myList.some((movie) => movie.id === paramsMovieId.id);
    //const indexOfMovie = myList.some((movie) => console.log(movie.id));
    console.log(myList);
    console.log(indexOfMovie);
    if (indexOfMovie) {
      console.log("movie is already in the list");
      setMovieAlreadyInList(true);
    }
    console.log("in use effect" + paramsMovieId.id);
    dispatch(getSelectedMovieDetails(paramsMovieId.id, setIsLoading));

    function handleSearch() {
      movieTrailer(video).then((res) => {
        setVideoURL(res);
      });
    }
    handleSearch();
    localStorage.setItem("title", selectedMovie.title);
    localStorage.setItem("poster", selectedMovie.poster);

    selectedMovie.rating
      ? localStorage.setItem("rating", selectedMovie.rating)
      : localStorage.setItem("rating", "not found");

    localStorage.setItem("id", selectedMovie.id);
  }, []);

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
      setMovieAlreadyInList(true);
    } else {
      setModalDetails({
        showModal: true,
        modalMessage: "Please login/register first",
        modalTitle: "Want to add the movie to your list?",
      });
    }
  };

  const closeModal = () => {
    setModalDetails({
      showModal: false,
      modalMessage: "",
      modalTitle: "",
    });
  };

  const seeImagesHandler = () => {
    navigate("photos");
  };

  const removeMovieFromListHAndler = () => {
    //we need the doc Id of the movie from myList
    const movieToBeRemoved = myList.find(
      (movie) => movie.id === paramsMovieId.id
    );
    const docId = movieToBeRemoved.docId;
    console.log(docId);
    dispatch(removeMovieAction(docId));
    setMovieAlreadyInList(false);
  };

  let content;

  if (isLoading) {
    content = (
      <div className={classes.loading}>
        {" "}
        <h1>Loading...</h1>
        <CircularProgress />;
      </div>
    );
  } else {
    content = (
      <div className={classes.container}>
        <LoginFirstModal
          open={modalDetails.showModal}
          message={modalDetails.modalMessage}
          title={modalDetails.modalTitle}
          closeModal={closeModal}
        />

        <div className={classes.aboutMovie}>
          {selectedMovie.poster === "not found" ? (
            <img
              src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=1060&t=st=1686225891~exp=1686226491~hmac=3d38af048498a82acae7c8532b5690954e890dd5c0629d09995f58c24eeb6b11"
              alt="poster of the movie not found"
            />
          ) : (
            <img src={selectedMovie.poster} alt="poster of the movie" />
          )}
          <div className={classes.description}>
            <h2>ABOUT</h2>
            {selectedMovie.description ? (
              <p style={{ color: "white" }}>{selectedMovie.description}</p>
            ) : (
              <CircularProgress />
            )}
          </div>
          <div className={classes.moreDetails}>
            <div className={classes.releaseInfo}>
              <h2>Released In</h2>
              <p style={{ color: "white" }}>{selectedMovie.year}</p>
            </div>
            <div className={classes.genre}>
              <h2>Genres</h2>
              {selectedMovie.genres ? (
                selectedMovie.genres.map((genre, index) => (
                  <p key={index.toString()} style={{ color: "white" }}>
                    {genre}
                  </p>
                ))
              ) : (
                <CircularProgress />
              )}
            </div>
          </div>
        </div>

        <div className={classes.trailerImages}>
          {videoURL ? (
            <ReactPlayer url={videoURL} controls={true} />
          ) : (
            <img
              style={{ width: "60%" }}
              src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?w=1480&t=st=1686226500~exp=1686227100~hmac=0c49c0ad1782bb20ca591ae66f4bfb1426e83bfa2886637b05e4a084b31c7000"
              alt="no movie trailer found"
            />
          )}

          <div className={classes.imagesAndInfo}>
            <div className={classes.ratingTypeList}>
              <div className={classes.rating}>
                <h2>Rating</h2>
                <div className={classes.starAndRating}>
                  {selectedMovie.rating ? (
                    <p>{selectedMovie.rating}/10</p>
                  ) : (
                    <CircularProgress />
                  )}
                </div>
              </div>
              <div className={classes.type}>
                <h2>Type</h2>
                <p>{selectedMovie.type}</p>
              </div>
              <div className={classes.list}>
                {movieAlreadyInList ? (
                  <button onClick={removeMovieFromListHAndler}>
                    <Tick style={{ width: "1.8em" }} />
                    Movie in your List
                  </button>
                ) : (
                  <button onClick={addToMyListHandler}>
                    <Plus style={{ width: "1.5em" }} />
                    Add to List
                  </button>
                )}
              </div>
            </div>
            <button className={classes.images} onClick={seeImagesHandler}>
              <Images style={{ width: "1.5em" }} />
              Images
            </button>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default MovieDetail;
