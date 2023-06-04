import { ReactComponent as LeftScroll } from "../../logos/leftScroll.svg";
import { ReactComponent as RightScroll } from "../../logos/rightScroll.svg";
import { useSelector } from "react-redux";
import classes from "./BrowseByGenreSection.module.css";
import { ReactComponent as VerticalLine } from "../../logos/verticalLine.svg";

const BrowseByGenreSection = () => {
  const sliderLeftGenre = () => {
    const slider = document.getElementById("sliderMyList");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const sliderRightGenre = () => {
    const slider = document.getElementById("sliderMyList");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const genreList = useSelector((state) => state.genreList.genreList);

  return (
    <div>
      <div className={classes.genreList}>
        <div className={classes.genreListHeader}>
          <VerticalLine className={classes.verticalSvg} />
          <h3>Browse by Genre</h3>
        </div>
      </div>
      <div className="relative flex items-center">
        <LeftScroll fontSize={40} onClick={sliderLeftGenre} fill="white" />

        <div
          id="sliderMyList"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {genreList.map((genre) => (
            <div className={classes.genreButton}>{genre}</div>
          ))}
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
