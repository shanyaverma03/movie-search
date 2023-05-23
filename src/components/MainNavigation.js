import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const pages = ["Browse", "My List"];
function MainNavigation() {
  const navigate = useNavigate();

  const browseClickHandler = () => {
    navigate("browse");
  };

  const mylistClickHandler = () => {
    navigate("mylist");
  };

  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated.isAuthenticated
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Movie Search
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="browse"
              onClick={browseClickHandler}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Browse
            </Button>
            {isAuthenticated && (
              <Button
                key="mylist"
                onClick={mylistClickHandler}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                My List
              </Button>
            )}
          </Box>
          <Link to="login" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link
            to="register"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainNavigation;
