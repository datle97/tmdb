import { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import MovieCard from "../common/MovieCard";
import { fetchCompany } from "../../api";
import CompanyHeader from "./CompanyHeader";
import CompanyInfo from "./CompanyInfo";
import LoadMore from "../common/LoadMore";
import Loading from "../common/Loading";
import BackgroundHeader from "../common/BackgroundHeader";

const CompanyPage = ({ match }) => {
  const [company, setCompany] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const { id } = match.params;
  useEffect(() => {
    const fetchData = async () => {
      if (loading) {
        // setCompany lần đầu
        setCompany(await fetchCompany(id, page));
        setLoading(false);
      } else {
        // setCompany khi click LoadMore
        setLoadingButton(true);
        setCompany({
          ...company,
          movies: {
            ...company.movies,
            results: [
              ...company.movies.results,
              ...(await fetchCompany(id, page)).movies.results,
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
        children={
          <>
            <CompanyHeader details={company} movies={company.movies} />
            <CompanyInfo details={company} />
          </>
        }
      />
      <Container>
        {company.movies.results.map((movie) => (
          <MovieCard key={movie.id} details={movie} />
        ))}
        {page < company.movies.total_pages && (
          <LoadMore loading={loadingButton} handleClick={handleClick} />
        )}
      </Container>
    </>
  );
};

export default CompanyPage;
