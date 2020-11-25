import {
  Box,
  Card,
  makeStyles,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tab: {
    padding: "24px 12px",
    marginRight: 0,
    "&.Mui-selected": {
      backgroundColor: theme.palette.action.disabledBackground,
      fontWeight: "bold",
    },
    [theme.breakpoints.down("sm")]: {
      padding: 12,
    },
  },
  label: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingLeft: 4,
    paddingRight: 4,
    fontWeight: "inherit",
  },
  span: {
    padding: "0 5px",
    border: "1px solid black",
    borderRadius: 10,
    marginLeft: theme.spacing(1),
  },
}));

const SearchResults = ({
  tvShowsResults,
  moviesResults,
  peopleResults,
  companiesResults,
  collectionsResults,
  keywordsResults,
  params,
}) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const allTabs = [
    {
      type: "movie",
      label: "Movies",
      total_results: moviesResults,
    },
    {
      type: "tv",
      label: "Tv Shows",
      total_results: tvShowsResults,
    },
    {
      type: "person",
      label: "People",
      total_results: peopleResults,
    },
    {
      type: "company",
      label: "Companies",
      total_results: companiesResults,
    },
    {
      type: "collection",
      label: "Collections",
      total_results: collectionsResults,
    },
    {
      type: "keyword",
      label: "Keywords",
      total_results: keywordsResults,
    },
  ];
  return (
    <Card>
      <Box p={2} bgcolor="primary.main" color="white">
        <Typography variant="h6">Search Results</Typography>
      </Box>
      <Tabs
        orientation={matches ? "horizontal" : "vertical"}
        variant={matches ? "scrollable" : "fullWidth"}
        scrollButtons="on"
        indicatorColor="primary"
        value={params.type}
      >
        {allTabs.map((tab) => (
          <Tab
            key={tab.type}
            component={Link}
            to={`/search/${tab.type}/${params.query}/1`}
            selected={tab.type === params.type}
            value={tab.type}
            // className={clsx(classes.tab, {
            //    [classes.selected]: tab.type === params.type,
            // })}
            className={classes.tab}
            label={
              <Typography className={classes.label}>
                {tab.label}
                <span className={classes.span}>{tab.total_results}</span>
              </Typography>
            }
          />
        ))}
      </Tabs>
    </Card>
  );
};

export default SearchResults;
