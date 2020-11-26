import { Box, useMediaQuery } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import { useHistory } from "react-router-dom";

const SearchPagination = ({ total_pages, params }) => {
  const history = useHistory();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const handleChange = (event, newPage) => {
    history.push(`/search/${params.type}/${params.query}/${newPage}`);
  };

  return (
    total_pages > 1 && (
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={total_pages}
          page={parseInt(params.page)}
          onChange={handleChange}
          shape="rounded"
          size={!matches ? "medium" : "small"}
        />
      </Box>
    )
  );
};

export default SearchPagination;
