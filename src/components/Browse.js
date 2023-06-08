import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import debounce from "lodash.debounce";
import axios from "axios";
import { apiInfo } from "../config/rapidAPI";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import classes from "./Browse.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { movieActions } from "../store/index";
import { ReactComponent as VerticalLine } from "../logos/verticalLine.svg";

const Browse = () => {
  const [movieRecs, setMovieRecs] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const searchHandler = async (event) => {
    console.log(event.target.value);
    setIsLoading(true);
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
      console.log(list);
      let moviesList = [];
      list.map((item) => {
        const id = item.id;
        const title = item.l;
        const year = item.y;
        const rank = item.rank;
        let poster;
        if (item.i) {
          poster = item.i.imageUrl;
        } else {
          poster = null;
        }

        const type = item.qid;
        const movie = {
          id,
          title,
          year,
          rank,
          poster,
          type,
        };
        moviesList.push(movie);
      });

      setMovieRecs(moviesList);
      setIsLoading(false);
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
    localStorage.setItem("movie", value.title);
    setSelectedValue(value);
    dispatch(movieActions.select(value));
    navigate(`${value.id}`);
  };
  return (
    <div>
      <div className={classes.searchContainer}>
        <h1>Search for any show or movie!</h1>

        <Autocomplete
          loading={isLoading}
          loadingText="Loading..."
          disablePortal
          id="combo-box-demo"
          options={movieRecs}
          getOptionLabel={(movieRecs) => movieRecs.title || ""}
          onInputCapture={debounce(searchHandler, 800)}
          onChange={(event, value) => selectionHandler(value)}
          sx={{ width: 300, background: "white" }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Search..." />
          )}
        />
      </div>
      <div className={classes.recentMovieHeader}>
        <VerticalLine className={classes.verticalSvg} />
        <h2>Recently searched</h2>
      </div>
    </div>
  );
};

export default Browse;
