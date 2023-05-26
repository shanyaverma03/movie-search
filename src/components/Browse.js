import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import debounce from "lodash.debounce";
import axios from "axios";
import { apiInfo } from "../config/rapidAPI";
import { useState } from "react";
import Container from "@mui/material/Container/Container";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import classes from "./Homescreen.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { movieActions } from "../store/index"; 

const Browse = () => {
  const [movieRecs, setMovieRecs] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const navigate = useNavigate();

  const searchHandler = async (event) => {
    console.log(event.target.value);
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/auto-complete",
      params: { q: event.target.value },
      headers: {
        "X-RapidAPI-Key": apiInfo["X-RapidAPI-Key"],
        "X-RapidAPI-Host": apiInfo["X-RapidAPI-Host"],
      },
    };

    try {
      const response = await axios.request(options);
      const list = response.data.d;
      console.log(list  )
      let moviesList = [];
      list.map((item) => {
        const id = item.id;
        const title = item.l;
        const year = item.y;
        const rank = item.rank;
        const poster = item.i.imageUrl;
        const type= item.qid
        const movie = {
          id,
          title,
          year,
          rank,
          poster,
          type
        };
        moviesList.push(movie);
      });

      setMovieRecs(moviesList);
      console.log(moviesList);
    } catch (error) {
      console.error(error);
    }
  };

  const dispatch = useDispatch();

  const selectionHandler = (value) => {
    // setSelectedValue(value.toString());
    console.log("in selection handler ");
    console.log(value);
    setSelectedValue(value);
    dispatch(movieActions.select(value));
    navigate(`${value.id}`);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <CssBaseline />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={movieRecs}
          getOptionLabel={(movieRecs) => movieRecs.title || ""}
          onInputCapture={debounce(searchHandler, 800)}
          onChange={(event, value) => selectionHandler(value)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search..." />}
        />
      </div>
    </>
  );
};

export default Browse;
