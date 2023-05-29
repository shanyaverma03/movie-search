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
import { useDispatch } from "react-redux";
import { logoutAction } from "../store/isAuthenticatedSlice";
import { auth } from "../config/firebase";
import { isAuthenticatedActions } from "../store";
import { signOut } from "firebase/auth";
import { createMuiTheme, createTheme } from "@mui/material";

function MainNavigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const browseClickHandler = () => {
    navigate("browse");
  };

  const mylistClickHandler = () => {
    navigate("mylist");
  };

  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated.isAuthenticated
  );

  const logoutHandler = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("error");
    }
    dispatch(isAuthenticatedActions.logout());
  };
  const theme = createTheme({
    typography: {
      allVariants: {
        color: "pink",
      },
    },
  });
  return (
    <AppBar
      style={{
        background: "#323232",
        flex: "0 1 auto",
      }}
      position="static"
    >
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
          {!isAuthenticated && (
            <>
              <Link
                to="login"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button color="inherit">Login</Button>
              </Link>
              <Link
                to="register"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
          {isAuthenticated && (
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Button color="inherit" onClick={logoutHandler}>
                Logout
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainNavigation;
