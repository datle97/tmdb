import { Typography } from "@material-ui/core";

import MovieCard from "../common/MovieCard";
import SearchPagination from "./SearchPagination";

const Movies = ({ movies, params }) => {
  return movies.results.length ? (
    <>
      {movies.results.map((movie) => (
        <MovieCard key={movie.id} details={movie} media_type={params.type} />
      ))}
      <SearchPagination total_pages={movies.total_pages} params={params} />
    </>
  ) : (
    <Typography>There are no movies that matched your query.</Typography>
  );
};

export default Movies;
