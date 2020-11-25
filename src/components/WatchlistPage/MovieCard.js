import {
  Card,
  CardMedia,
  Typography,
  makeStyles,
  CardContent,
  CardActionArea,
  Box,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeMovie } from "../../actions/watchlistActions";
import StyledDoughnut from "../common/CustomDoughnut";
import CloseIcon from "@material-ui/icons/Close";
import { DateTime } from "luxon";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    height: 210,
    marginBottom: theme.spacing(3),
  },
  cardMedia: {
    height: "100%",
    width: 140,
    borderRadius: 0,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  overview: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  removeButton: {
    border: "black 1px solid",
    marginRight: theme.spacing(1),
  },

  progress: {
    color: "#90caf9",
    position: "absolute",
    top: -4,
    left: -4,
    zIndex: 1,
  },
}));

const MovieCard = ({ movie }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isRemoving } = useSelector((state) => state.watchlist);

  return (
    <Card className={classes.card}>
      <CardActionArea
        component={Link}
        to={`/${movie.media_type}/${movie.id}`}
        className={classes.cardMedia}
      >
        <CardMedia
          component="img"
          image={movie.poster_path}
          title={movie.title}
          alt={movie.title}
          loading="lazy"
          className={classes.cardMedia}
        />
      </CardActionArea>
      <CardContent className={classes.cardContent}>
        <Box display="flex" alignItems="center">
          <Box mr={1}>
            <StyledDoughnut vote_average={movie.vote_average} size={40} />
          </Box>
          <Box>
            <Typography
              component={Link}
              to={`/${movie.media_type}/${movie.id}`}
              variant="subtitle1"
            >
              {movie.title}
            </Typography>
            {movie.release_date && (
              <Typography variant="subtitle2" color="textSecondary">
                {DateTime.fromISO(movie.release_date).toFormat("MMMM dd, yyyy")}
              </Typography>
            )}
          </Box>
        </Box>
        <div className={classes.overview}>
          <Typography>{movie.overview}</Typography>
        </div>
        <Box position="relative" display="flex" alignItems="center">
          <IconButton
            size="small"
            onClick={() => dispatch(removeMovie(movie.id))}
            className={classes.removeButton}
          >
            <CloseIcon />
          </IconButton>
          {isRemoving === movie.id && (
            <CircularProgress size={40} className={classes.progress} />
          )}
          <Typography>Remove</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
