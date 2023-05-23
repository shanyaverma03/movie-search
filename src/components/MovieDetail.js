import { useParams } from "react-router";
const MovieDetail = () => {
  const params = useParams();
  return (
    <>
      <h1>Movie detail</h1>
      <p>{params.id}</p>
    </>
  );
};

export default MovieDetail;
