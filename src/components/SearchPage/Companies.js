import { Box, makeStyles, Typography } from "@material-ui/core";

import { Link } from "react-router-dom";
import SearchPagination from "./SearchPagination";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
  },
}));

const Companies = ({ companies, params }) => {
  const classes = useStyles();
  return companies.results.length > 0 ? (
    <>
      {companies.results.map((company) => (
        <Box
          key={company.id}
          display="flex"
          alignItems="center"
          height="40px"
          borderBottom="1px solid black"
        >
          <Link to={`/company/${company.id}`} className={classes.link}>
            {company.logo_path ? (
              <img
                src={company.logo_path}
                alt={company.name}
                title={company.name}
              />
            ) : (
              <Typography>{company.name}</Typography>
            )}
            {company.origin_country && (
              <Box
                component="span"
                ml={1}
                px={1}
                bgcolor="text.secondary"
                color="white"
                borderRadius="5px"
              >
                {company.origin_country}
              </Box>
            )}
          </Link>
        </Box>
      ))}
      <SearchPagination total_pages={companies.total_pages} params={params} />
    </>
  ) : (
    <Typography>There are no companies that matched your query.</Typography>
  );
};

export default Companies;
