import { Typography } from "@material-ui/core";

import MovieCard from "../common/MovieCard";
import SearchPagination from "./SearchPagination";

const Collections = ({ collections, params }) => {
  return collections.results.length > 0 ? (
    <>
      {collections.results.map((collection) => (
        <MovieCard
          key={collection.id}
          details={collection}
          media_type={params.type}
        />
      ))}
      <SearchPagination total_pages={collections.total_pages} params={params} />
    </>
  ) : (
    <Typography>There are no collections that matched your query.</Typography>
  );
};

export default Collections;
