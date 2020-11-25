import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import { useHistory } from "react-router-dom";

const SearchPagination = ({ total_pages, params }) => {
  const history = useHistory();

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
        />
      </Box>
    )
  );
};

export default SearchPagination;
