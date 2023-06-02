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

const MovieDetail = (props) => {
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
    dispatch(getSelectedMovieDetails(paramsMovieId.id));

    function handleSearch() {
      movieTrailer(video).then((res) => {
        setVideoURL(res);
      });
    }
    handleSearch();
  }, [video]);

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

  const seeImagesHandler = () => {
    navigate("photos");
  };

  return (
    <div className={classes.container}>
      <LoginFirstModal
        open={modalDetails.showModal}
        message={modalDetails.modalMessage}
        title={modalDetails.modalTitle}
        closeModal={closeModal}
      />
      <div className={classes.aboutMovie}>
        <img src={selectedMovie.poster} alt="poster of the movie" />
        <div className={classes.description}>
          <h2>ABOUT</h2>
          <p style={{ color: "white" }}>{selectedMovie.description}</p>
        </div>
        <div className={classes.moreDetails}>
          <div className={classes.releaseInfo}>
            <h2>Released In</h2>
            <p style={{ color: "white" }}>{selectedMovie.year}</p>
          </div>
          <div className={classes.genre}>
            <h2>Genres</h2>
            {selectedMovie.genres &&
              selectedMovie.genres.map((genre) => (
                <p key={selectedMovie.id} style={{ color: "white" }}>
                  {genre}
                </p>
              ))}
          </div>
        </div>
      </div>

      <div className={classes.trailerImages}>
        <ReactPlayer url={videoURL} controls={true} />
        <div className={classes.imagesVideos}>
          <button className={classes.images} onClick={seeImagesHandler}>
            images
          </button>
          <button className={classes.videos}>videos</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
