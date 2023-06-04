import classes from "./TopMoviesSection.module.css";
import { ReactComponent as VerticalLine } from "../../logos/verticalLine.svg";
import { ReactComponent as LeftScroll } from "../../logos/leftScroll.svg";
import { ReactComponent as RightScroll } from "../../logos/rightScroll.svg";
import { useSelector } from "react-redux";
import TopMovieDetail from "./TopMovieDetail";

const TopMoviesSection = () => {
  const topMoviesList = useSelector((state) => state.topMovies.topList);

  const sliderLeftTopMovies = () => {
    const slider = document.getElementById("sliderTopMovie");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const sliderRightTopMovies = () => {
    const slider = document.getElementById("sliderTopMovie");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className={classes.topMovies}>
      <div className={classes.topMoviesHeader}>
        <VerticalLine className={classes.verticalSvg} />
        <h3>Top Movies</h3>
      </div>

      <div className="relative flex items-center">
        <LeftScroll fontSize={40} onClick={sliderLeftTopMovies} fill="white" />
        <div
          id="sliderTopMovie"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {topMoviesList.map((topMovie) => (
            <TopMovieDetail
              key={topMovie.imdbid}
              imdbid={topMovie.imdbid} 
              description={topMovie.description}
              genre={topMovie.genre}
              rank={topMovie.rank}
              rating={topMovie.rating}
              thumbnail={topMovie.thumbnail}
              title={topMovie.title}
              trailer={topMovie.trailer}
              year={topMovie.year}
              image={topMovie.image}
            />
          ))}
        </div>
        <RightScroll
          fontSize={40}
          onClick={sliderRightTopMovies}
          className="opacity-50 cursor-pointer hover:opacity-100"
          fill="white"
        />
      </div>
    </div>
  );
};

export default TopMoviesSection;
