import classes from "./MyListCard.module.css";
import { ReactComponent as Info } from "../logos/info.svg";
import { useNavigate } from "react-router";

const MyListCard = (props) => {
  const navigate = useNavigate();

  const moreInfoIconHandler = () => {
    navigate(`/browse/${props.imdbid}`);
  };

  return (
    <div className={classes.myListMovies}>
      <div className={classes.card}>
        <img src={props.image} alt="thumbnail" />
        <div className={classes.container}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
          <p className={classes.title}>{props.title}</p>
          <div className={classes.actionAndLearn}>
            <button>Remove</button>

            <Info onClick={moreInfoIconHandler} className={classes.info} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListCard;
