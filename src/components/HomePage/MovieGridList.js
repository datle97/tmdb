import {
  Typography,
  GridList,
  GridListTile,
  makeStyles,
  Box,
  useMediaQuery,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import StyledDoughnut from "../common/CustomDoughnut";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const useStyles = makeStyles((theme) => ({
  movieGridList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    minHeight: 300,
  },
  cardMedia: {
    height: 0,
    paddingTop: "150%",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    // spacing tự thêm margin root => lam mat thanh scroll
    marginBottom: "0 !important",
  },
}));
const MovieGridList = ({ movies }) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <div className={classes.movieGridList}>
      <GridList
        cellHeight="auto"
        cols={matches ? 2.5 : 7.5}
        spacing={8}
        className={classes.gridList}
      >
        {movies.map((movie) => (
          <GridListTile key={movie.id}>
            <CardActionArea
              component={Link}
              to={`/${movie.media_type}/${movie.id}`}
            >
              <CardMedia
                image={movie.poster_path}
                title={movie.title}
                className={classes.cardMedia}
              />
            </CardActionArea>
            <Box p={1} pt={2} position="relative">
              <Box position="absolute" top={-18}>
                <StyledDoughnut vote_average={movie.vote_average} size={30} />
              </Box>
              <Typography
                variant="subtitle2"
                component={Link}
                to={`/${movie.media_type}/${movie.id}`}
              >
                {movie.title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {DateTime.fromISO(movie.release_date).toFormat("MMM dd, yyyy")}
              </Typography>
            </Box>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default MovieGridList;
