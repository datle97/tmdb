import { Typography } from "@material-ui/core";

import SearchPagination from "./SearchPagination";
import { Link } from "react-router-dom";

const Keywords = ({ keywords, params }) => {
  return keywords.results.length ? (
    <>
      {keywords.results.map((keyword) => (
        <Typography key={keyword.id}>
          <Link to={`/keyword/${keyword.id}`}>{keyword.name}</Link>
        </Typography>
      ))}
      <SearchPagination total_pages={keywords.total_pages} params={params} />
    </>
  ) : (
    <Typography>There are no keywords that matched your query.</Typography>
  );
};

export default Keywords;
