import classes from "./TopCastSection.module.css";
import { ReactComponent as VerticalLine } from "../../logos/verticalLine.svg";
import { ReactComponent as LeftScroll } from "../../logos/leftScroll.svg";
import { ReactComponent as RightScroll } from "../../logos/rightScroll.svg";
import { useSelector } from "react-redux";

const TopCastSection = ({ topCast }) => {
  const sliderLeftTopCast = () => {
    const slider = document.getElementById("sliderCast");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const sliderRightTopCast = () => {
    const slider = document.getElementById("sliderCast");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const content =
    topCast &&
    topCast.map((cast) => {
      return (
        <div className={classes.imageCard}>
          <div className={classes.castInfo}>
            <img src={cast.imageUrl} alt="actor" />
            <div className={classes.names}>
              <p style={{ fontWeight: "500", color: "white" }}>{cast.name}</p>
              <p style={{ color: "#EDEADE" }}>{cast.character}</p>
            </div>
          </div>
        </div>
      );
    });
  return (
    <div className={classes.topCast}>
      <div className={classes.topCastHeader}>
        <VerticalLine className={classes.verticalSvg} />
        <h3>Top Cast</h3>
      </div>

      <div className="relative flex items-center">
        <LeftScroll fontSize={40} onClick={sliderLeftTopCast} fill="white" />
        <div
          id="sliderCast"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {content}
        </div>
        <RightScroll
          fontSize={40}
          onClick={sliderRightTopCast}
          className="opacity-50 cursor-pointer hover:opacity-100"
          fill="white"
        />
      </div>
    </div>
  );
};

export default TopCastSection;
