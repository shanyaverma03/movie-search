import { useSelector } from "react-redux";
const MyList = () => {
  const myList = useSelector((state) => state.mylist.mylist);
  return (
    <>
      <h1>the list</h1>
      {myList.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </>
  );
};

export default MyList;
