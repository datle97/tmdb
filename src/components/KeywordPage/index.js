import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { fetchKeyword } from "../../api";
import CompanyHeader from "../CompanyPage/CompanyHeader";
import MovieCard from "../common/MovieCard";
import LoadMore from "../common/LoadMore";
import Loading from "../common/Loading";
import BackgroundHeader from "../common/BackgroundHeader";

const KeywordPage = ({ match }) => {
  const [keyword, setKeyword] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const { id } = match.params;
  useEffect(() => {
    const fetchData = async () => {
      if (loading) {
        // setKeyword lần đầu
        setKeyword(await fetchKeyword(id, page));
        setLoading(false);
      } else {
        // setKeyword khi click LoadMore
        setLoadingButton(true);
        setKeyword({
          ...keyword,
          movies: {
            ...keyword.movies,
            results: [
              ...keyword.movies.results,
              ...(await fetchKeyword(id, page)).movies.results,
            ],
          },
        });
        setLoadingButton(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);
  const handleClick = () => {
    setPage(page + 1);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <BackgroundHeader
        children={<CompanyHeader details={keyword} movies={keyword.movies} />}
      />
      <Container>
        {keyword.movies.results.map((movie) => (
          <MovieCard key={movie.id} details={movie} />
        ))}
        {page < keyword.movies.total_pages && (
          <LoadMore loading={loadingButton} handleClick={handleClick} />
        )}
      </Container>
    </>
  );
};

export default KeywordPage;
