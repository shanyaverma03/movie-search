import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { myListActions } from "../store";
import { useEffect } from "react";
import { getListAction } from "../store/myListSlice";
import { getUidOfUserAction } from "../store/isAuthenticatedSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { db } from "../config/firebase";

import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const MyList = () => {
  const myList = useSelector((state) => state.mylist.mylist);
  const userId = useSelector((state) => state.isAuthenticated.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMovieList = async (id) => {
    const list = [];
    const q = query(collection(db, "mylist"), where("userId", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id });
      //console.log(list)
    });
    console.log(list);
    return list;
  };
  useEffect(() => {
    if (userId) {
      console.log(userId);
      //const movieList = dispatch(getListAction(uid));
      const movieList = getMovieList(userId);
      console.log("in my list component");
      console.log(movieList);
    } else {
      navigate("/");
    }
  }, []);

  const removeMovieHandler = (id) => {
    dispatch(myListActions.remove(id));
  };
  return (
    <>
      <h1>the list</h1>
      {myList.map((movie) => (
        <Card key={movie.id} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            sx={{ height: 500 }}
            image={movie.poster}
            title="movie-detail"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rank: {movie.rank}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Something about the movie- to figure out
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => removeMovieHandler(movie.id)}>
              Remove from list
            </Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default MyList;
