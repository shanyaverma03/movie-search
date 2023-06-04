import { ReactComponent as LeftScroll } from "../../logos/leftScroll.svg";
import { ReactComponent as RightScroll } from "../../logos/rightScroll.svg";

const BrowseByGenreSection = () => {
  const sliderLeftGenre = () => {
    const slider = document.getElementById("sliderMyList");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const sliderRightGenre = () => {
    const slider = document.getElementById("sliderMyList");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <div className="relative flex items-center">
      <LeftScroll fontSize={40} onClick={sliderLeftGenre} fill="white" />

      <div
        id="sliderMyList"
        className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
      ></div>

      <RightScroll
        fontSize={40}
        onClick={sliderRightGenre}
        className="opacity-50 cursor-pointer hover:opacity-100"
        fill="white"
      />
    </div>
  );
};

export default BrowseByGenreSection;
