import * as React from "react";
import Button from "./UI/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import classes from "./Homescreen.module.css";
import Footer from "./Footer";
const Homescreen = () => {
  const navigate = useNavigate();

  const browseMovieHandler = () => {
    navigate("/browse");
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
      </Box>
    </div>
  );
};

export default Homescreen;
