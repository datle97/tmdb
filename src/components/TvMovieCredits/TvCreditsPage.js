import { useEffect, useState } from "react";
import { fetchTvShow } from "../../api";
import Loading from "../common/Loading";
import sortByDepartment from "../common/sortByDepartment";
import MovieCredits from "./MovieCredits";
import MovieHeader from "./MovieHeader";

const TvCreditsPage = ({ match }) => {
  const [tvShow, setTvShow] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = match.params;
  useEffect(() => {
    const fetchData = async () => {
      setTvShow(await fetchTvShow(id));
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const modifiedCrew = !loading ? sortByDepartment(tvShow.credits.crew) : [];
  return loading ? (
    <Loading />
  ) : (
    <>
      <MovieHeader details={tvShow} />
      <MovieCredits cast={tvShow.credits.cast} crew={modifiedCrew} />
    </>
  );
};

export default TvCreditsPage;
