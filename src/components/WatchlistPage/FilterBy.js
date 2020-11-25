import {
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  filterBy: {
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    marginLeft: theme.spacing(1),
  },
}));

const FilterBy = ({ sortBy, handleSortBy }) => {
  const classes = useStyles();
  return (
    <Grid item md="auto" xs={12} className={classes.filterBy}>
      <Typography>Filter By: </Typography>
      <FormControl className={classes.formControl}>
        <Select value={sortBy} onChange={handleSortBy}>
          <MenuItem value="date_added">Date Added</MenuItem>
          <MenuItem value="popularity">Popularity</MenuItem>
          <MenuItem value="release_date">Release Date</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default FilterBy;
