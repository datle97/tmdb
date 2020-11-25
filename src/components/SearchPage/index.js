import { useState, useEffect } from "react";
import {
  searchMovies,
  searchPeople,
  searchTvShows,
  searchCompanies,
  searchCollections,
  searchKeywords,
} from "../../api";
import { Box, CircularProgress, Container, Grid } from "@material-ui/core";
import SearchResults from "./SearchResults";
import Loading from "../common/Loading";
import Movies from "./Movies.js";
import TvShows from "./TvShows.js";
import People from "./People.js";
import Companies from "./Companies.js";
import Collections from "./Collections.js";
import Keywords from "./Keywords.js";

const SearchPage = ({ match }) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [resultsLoading, setResultsLoading] = useState(true);
  const params = match.params;
  const page = parseInt(params.page);
  const { query, type } = params;

  useEffect(() => {
    const fetchData = async () => {
      setResultsLoading(true);
      // setAllState để lấy totalResult
      const searchResults = await Promise.all([
        // error khi thay đổi page => searchAll(giải pháp: có thể fetch từng type)
        searchMovies(query, page),
        searchTvShows(query, page),
        searchPeople(query, page),
        searchCompanies(query, page),
        searchCollections(query, page),
        searchKeywords(query, page),
      ]);
      const [
        movies,
        tvShows,
        people,
        companies,
        collections,
        keywords,
      ] = searchResults;

      setResults({
        movies,
        tvShows,
        people,
        companies,
        collections,
        keywords,
      });
      setLoading(false);
      setResultsLoading(false);
    };
    fetchData();
  }, [query, page]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <SearchResults
            tvShowsResults={results.tvShows.total_results}
            moviesResults={results.movies.total_results}
            peopleResults={results.people.total_results}
            companiesResults={results.companies.total_results}
            collectionsResults={results.collections.total_results}
            keywordsResults={results.keywords.total_results}
            params={params}
          />
        </Grid>
        <Grid item md={9} xs={12}>
          {resultsLoading ? (
            <Box
              height={350}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              {type === "movie" && (
                <Movies movies={results.movies} params={params} />
              )}
              {type === "tv" && (
                <TvShows tvShows={results.tvShows} params={params} />
              )}
              {type === "person" && (
                <People people={results.people} params={params} />
              )}
              {type === "company" && (
                <Companies companies={results.companies} params={params} />
              )}
              {type === "collection" && (
                <Collections
                  collections={results.collections}
                  params={params}
                />
              )}
              {type === "keyword" && (
                <Keywords keywords={results.keywords} params={params} />
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchPage;
