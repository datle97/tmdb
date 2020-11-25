import { Typography } from "@material-ui/core";

import MovieCard from "../common/MovieCard";
import SearchPagination from "./SearchPagination";

const TvShows = ({ tvShows, params }) => {
  return tvShows.results.length ? (
    <>
      {tvShows.results.map((tvShow) => (
        <MovieCard key={tvShow.id} details={tvShow} media_type={params.type} />
      ))}
      <SearchPagination total_pages={tvShows.total_pages} params={params} />
    </>
  ) : (
    <Typography>There are no TV shows that matched your query.</Typography>
  );
};

export default TvShows;
