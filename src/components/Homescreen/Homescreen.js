import * as React from "react";
import Button from "../UI/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import classes from "./Homescreen.module.css";
import { useEffect } from "react";
import { getTopMovies } from "../../store/topMoviesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TopMovieDetail from "./TopMovieDetail";
import MyMovieDetail from "../MyMovieDetail";
import TopMoviesSection from "./TopMoviesSection";

import { ReactComponent as LeftScroll } from "../../logos/leftScroll.svg";
import { ReactComponent as RightScroll } from "../../logos/rightScroll.svg";

const Homescreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated.isAuthenticated
  );
  const myList = useSelector((state) => state.mylist.mylist);
  const browseMovieHandler = () => {
    navigate("/browse");
  };

  useEffect(() => {
    console.log(myList);
    dispatch(getTopMovies());
  }, []);

  const sliderLeftMyList = () => {
    const slider = document.getElementById("sliderMyList");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const sliderRightMyList = () => {
    const slider = document.getElementById("sliderMyList");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
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
          <TopMoviesSection />
          <div className={classes.fromYourList}>
            <h3>From your List</h3>
            {isAuthenticated ? (
              <div className="relative flex items-center">
                <LeftScroll
                  fontSize={40}
                  onClick={sliderLeftMyList}
                  className={classes.LeftScroll}
                  fill="white"
                />
                <div
                  id="sliderMyList"
                  className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                >
                  {myList.map((topMovie) => (
                    <MyMovieDetail
                      key={topMovie.id}
                      image={topMovie.poster}
                      title={topMovie.title}
                      rank={topMovie.rank}
                      type={topMovie.type}
                      year={topMovie.year}
                      docId={topMovie.docId}
                    />
                  ))}
                </div>
                <RightScroll
                  fontSize={40}
                  onClick={sliderRightMyList}
                  className="opacity-50 cursor-pointer hover:opacity-100"
                  fill="white"
                />
              </div>
            ) : (
              <div className={classes.signInFirst}>
                <h4>Sign in to access your List</h4>
                <p>
                  Save shows and movies to keep track of what you want to watch
                </p>
              </div>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Homescreen;
