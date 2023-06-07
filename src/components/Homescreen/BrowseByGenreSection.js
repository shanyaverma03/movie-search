import { ReactComponent as LeftScroll } from "../../logos/leftScroll.svg";
import { ReactComponent as RightScroll } from "../../logos/rightScroll.svg";
import { useSelector } from "react-redux";
import classes from "./BrowseByGenreSection.module.css";
import { ReactComponent as VerticalLine } from "../../logos/verticalLine.svg";
import { useNavigate } from "react-router";
import { LinearProgress } from "@mui/material";

const BrowseByGenreSection = (props) => {
  const navigate = useNavigate();
  const genreList = useSelector((state) => state.genreList.genreList);

  const sliderLeftGenre = () => {
    const slider = document.getElementById("sliderGenreList");

    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const sliderRightGenre = () => {
    const slider = document.getElementById("sliderGenreList");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  let content;

  if (props.isLoading) {
    content = <LinearProgress color="inherit" />;
  } else {
    content = genreList.map((genre, index) => (
      <div
        className={classes.container}
        key={index.toString()}
        onClick={() => {
          navigate(`/browse/genres/${genre.genre}`);
        }}
      >
        <img src={genre.image} alt="category reference" />
        <div className={classes.bottomLeft}>{genre.genre}</div>
      </div>
    ));
  }
  return (
    <div className={classes.genreList}>
      <div className={classes.genreListHeader}>
        <VerticalLine className={classes.verticalSvg} />
        <h3>Browse by Genre</h3>
      </div>

      <div className="relative flex items-center">
        <LeftScroll fontSize={40} onClick={sliderLeftGenre} fill="white" />

        <div
          id="sliderGenreList"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {content}
        </div>

        <RightScroll
          fontSize={40}
          onClick={sliderRightGenre}
          className="opacity-50 cursor-pointer hover:opacity-100"
          fill="white"
        />
      </div>
    </div>
  );
};

export default BrowseByGenreSection;
