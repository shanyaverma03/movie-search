import classes from "./MyMoviesSection.module.css";
import { useSelector } from "react-redux";
import { ReactComponent as LeftScroll } from "../../logos/leftScroll.svg";
import { ReactComponent as RightScroll } from "../../logos/rightScroll.svg";
import MyMovieDetail from "./MyMovieDetail";
import { ReactComponent as VerticalLine } from "../../logos/verticalLine.svg";
import { ReactComponent as Wishlist } from "../../logos/wishlist.svg";
import { useState, useEffect } from "react";
import Button from "../UI/Button";
import { useNavigate } from "react-router";

const MyMoviesSection = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated.isAuthenticated
  );
  const myList = useSelector((state) => state.mylist.mylist);

  const [listIsEmpty, setListIsEmpty] = useState(false);

  const sliderLeftMyList = () => {
    const slider = document.getElementById("sliderMyList");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const sliderRightMyList = () => {
    const slider = document.getElementById("sliderMyList");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const browseHandler = () => {
    navigate("browse");
  };

  useEffect(() => {
    if (myList.length === 0) {
      setListIsEmpty(true);
    } else {
      setListIsEmpty(false);
    }
  }, [myList.length]);

  let mainContent;

  if (isAuthenticated) {
    if (listIsEmpty) {
      mainContent = (
        <div className={classes.messageUnderMyList}>
          <Wishlist style={{ height: "3em" }} />
          <h4>Your List is empty</h4>
          <p>Save shows and movies to keep track of what you want to watch</p>
          <button onClick={browseHandler}>Browse</button>
        </div>
      );
    } else {
      mainContent = (
        <div className="relative flex items-center">
          <LeftScroll fontSize={40} onClick={sliderLeftMyList} fill="white" />

          <div
            id="sliderMyList"
            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {myList.map((topMovie, index) => (
              <MyMovieDetail
                key={index.toString()}
                id={topMovie.id}
                image={topMovie.poster}
                title={topMovie.title}
                rank={topMovie.rank}
                type={topMovie.type}
                year={topMovie.year}
                docId={topMovie.docId}
              />
            ))}
          </div>

          <RightScroll
            fontSize={40}
            onClick={sliderRightMyList}
            className="opacity-50 cursor-pointer hover:opacity-100"
            fill="white"
          />
        </div>
      );
    }
  } else {
    mainContent = (
      <div className={classes.messageUnderMyList}>
        <Wishlist style={{ height: "3em" }} />
        <h4>Sign in to access your List</h4>
        <p>Save shows and movies to keep track of what you want to watch</p>
      </div>
    );
  }
  return (
    <div className={classes.fromYourList}>
      <div className={classes.myMoviesHeader}>
        <VerticalLine className={classes.verticalSvg} />
        <h3>From your List</h3>
      </div>
      {mainContent}
    </div>
  );
};

export default MyMoviesSection;
