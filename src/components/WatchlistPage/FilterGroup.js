import { Grid, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  filterGroup: {
    display: "flex",
    alignItems: "center",
  },
  tabs: {
    marginLeft: theme.spacing(3),
  },
}));

const FilterGroup = ({ type, handleType, totalMovie, totalTv }) => {
  const classes = useStyles();
  return (
    <Grid item md="auto" xs={12} className={classes.filterGroup}>
      <Typography variant="h5">My Watchlist</Typography>
      <Tabs
        value={type}
        onChange={handleType}
        indicatorColor="primary"
        textColor="primary"
        className={classes.tabs}
      >
        <Tab label={"Movies " + totalMovie} disableRipple value="movie" />
        <Tab label={"Tv " + totalTv} disableRipple value="tv" />
      </Tabs>
    </Grid>
  );
};

export default FilterGroup;
