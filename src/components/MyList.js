import { useSelector } from "react-redux";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const MyList = () => {
  const myList = useSelector((state) => state.mylist.mylist);
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
            <Button size="small">Remove from list</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default MyList;
