import * as React from "react";
import Button from "../UI/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router";
import classes from "./Homescreen.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TopMoviesSection from "./TopMoviesSection";
import MyMoviesSection from "./MyMoviesSection.js";
import { getGenreList } from "../../store/genreListSlice";
import BrowseByGenreSection from "./BrowseByGenreSection";
import { useState } from "react";
import { getTopMoviesAndAdd } from "../../store/topMoviesSlice";

const Homescreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myList = useSelector((state) => state.mylist.mylist);

  const browseMovieHandler = () => {
    navigate("/browse");
  };

  const [genreIsLoading, setGenreIsLoading] = useState(false);
  const [topMovieIsLoading, setTopMovieIsLoading] = useState(false);

  useEffect(() => {
    console.log(myList);
    dispatch(getTopMoviesAndAdd(setTopMovieIsLoading));

    dispatch(getGenreList(setGenreIsLoading));
  }, []);

  return (
    <div>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: `linear-gradient(
            90deg,
            rgba(2, 0, 36, 1) 0%,
            rgba(92, 112, 128, 1) 23%,
            rgba(85, 122, 149, 0.9710477941176471) 64%
          )`,
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="#F9F6EE"
            gutterBottom
          >
            Movie Search
          </Typography>
          <Typography variant="h5" align="center" color="#FAF9F6" paragraph>
            Search the ratings and description of any movie or TV show you want!
            Add your favourite movies to your list. Happy browsing!
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button onClick={browseMovieHandler} message="Browse a movie" />
          </Stack>
        </Container>

        <div className={classes.featuredSection}>
          <div className={classes.whatToWatch}>
            <h2>What to watch</h2>
          </div>
          <TopMoviesSection isLoading={topMovieIsLoading} />
          <MyMoviesSection />
          <BrowseByGenreSection isLoading={genreIsLoading} />
        </div>
      </Box>
    </div>
  );
};

export default Homescreen;
