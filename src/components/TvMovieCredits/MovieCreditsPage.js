import { useEffect, useState } from "react";
import { fetchMovie } from "../../api";
import Loading from "../common/Loading";
import sortByDepartment from "../common/sortByDepartment";
import MovieCredits from "./MovieCredits";
import MovieHeader from "./MovieHeader";

const MovieCreditsPage = ({ match }) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = match.params;
  useEffect(() => {
    const fetchData = async () => {
      setMovie(await fetchMovie(id));
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const modifiedCrew = !loading ? sortByDepartment(movie.credits.crew) : [];

  return loading ? (
    <Loading />
  ) : (
    <>
      <MovieHeader details={movie} />
      <MovieCredits cast={movie.credits.cast} crew={modifiedCrew} />
    </>
  );
};

export default MovieCreditsPage;
