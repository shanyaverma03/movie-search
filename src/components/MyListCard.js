import classes from "./MyListCard.module.css";
import { ReactComponent as Info } from "../logos/info.svg";
import { useNavigate } from "react-router";
import { removeMovieAction } from "../store/myListSlice";
import { useDispatch } from "react-redux";

const MyListCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moreInfoIconHandler = () => {
    navigate(`/browse/${props.id}`);
  };

  const removeMovieHandler = () => {
    console.log(props.docId);
    dispatch(removeMovieAction(props.docId));
  };

  return (
    <div className={classes.card}>
      <img src={props.image} alt="thumbnail" />
      <div className={classes.container}>
        <p className={classes.title}>{props.title}</p>
        <div className={classes.actionAndLearn}>
          <button onClick={removeMovieHandler}>Remove</button>

          <Info onClick={moreInfoIconHandler} className={classes.info} />
        </div>
      </div>
    </div>
  );
};

export default MyListCard;
