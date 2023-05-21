import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import debounce from "lodash.debounce";
import axios from "axios";
import { apiInfo } from "../config/rapidAPI";
import { useState } from "react";
const Homescreen = () => {
  const [movieRecs, setMovieRecs] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

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
      console.log(response.data);
      const list = response.data.d;
      let moviesList = [];
      list.map((item) => {
        const title = item.l;
        const year = item.y;
        const rank = item.rank;
        const poster = item.i.imageUrl;
        const movie = {
          title,
          year,
          rank,
          poster,
        };

        moviesList.push(movie);
      });

      setMovieRecs(moviesList);
      console.log(moviesList);
    } catch (error) {
      console.error(error);
    }
  };

  const selectionHandler = (value) => {
    // setSelectedValue(value.toString());
    console.log("selected value is " + value);
  };

  return (
    <>
      <h1>I am in homescreen</h1>
      <Box sx={{ flexGrow: 0 }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={movieRecs}
          getOptionLabel={(movieRecs) => movieRecs.title || ""}
          onInputCapture={debounce(searchHandler, 800)}
          onChange={(event, value) => console.log(value)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search..." />}
        />
      </Box>
    </>
  );
};

export default Homescreen;
