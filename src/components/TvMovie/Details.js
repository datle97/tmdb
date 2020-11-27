// Dùng cho các page: Tv, Movie, Collection
import {
  CardMedia,
  Typography,
  Fab,
  makeStyles,
  Grid,
  Container,
  Tooltip,
  CircularProgress,
} from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import StyledDoughnut from "../common/CustomDoughnut";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../../actions/watchlistActions";
import { DateTime } from "luxon";

const useStyles = makeStyles((theme) => ({
  backdrop: (props) => ({
    backgroundPosition: "right top",
    backgroundSize: "cover",

    backgroundImage: `linear-gradient(to right, 
      rgba(0, 0, 0, 1), 
      rgba(20, 20, 20, 0.85)), 
      url(${props.backdrop_path})`,
  }),
  container: {
    color: "white",
  },
  styledDoughnut: {
    paddingRight: "0 !important",
  },

  certification: {
    padding: "2px 4px",
    border: "1px solid white",
  },
  wrapper: {
    position: "relative",
  },
  fabProgress: {
    color: "#90caf9",
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 1,
  },
}));

const Details = ({ details, created_by }) => {
  const classes = useStyles({ backdrop_path: details.backdrop_path });
  const { isAuth } = useSelector((state) => state.user);
  const { watchlist, isLoading, isAdding, isRemoving } = useSelector(
    (state) => state.watchlist
  );
  const dispatch = useDispatch();

  const handleAddMovie = () => {
    const movie = {
      id: details.id,
      media_type: details.media_type,
      title: details.title,
      poster_path: details.poster_path,
      release_date: details.release_date,
      overview: details.overview,
      vote_average: details.vote_average,
      popularity: details.popularity,
    };
    dispatch(addMovie(movie));
  };

  // kiểm tra xem movie đã tồn tại trong watchlist hay chưa => add button to remove button
  const isAdded = watchlist.some((movie) => movie.id === details.id);
  return (
    <div className={classes.backdrop}>
      <Container className={classes.container}>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item md={3} xs={6}>
            <CardMedia
              component="img"
              image={details.poster_path}
              alt={details.title}
              title={details.title}
              loading="lazy"
            />
          </Grid>
          <Grid
            item
            container
            md={9}
            xs={12}
            direction="column"
            spacing={2}
            pl={4}
          >
            <Grid item>
              <Typography variant="h4">
                {details.title}{" "}
                {details.release_date && (
                  <Typography variant="subtitle1" component="span">
                    {`(${new Date(details.release_date).getFullYear()})`}
                  </Typography>
                )}
              </Typography>
              <Typography variant="body2">
                {details.release_dates && (
                  <>
                    {details.release_dates.certification && (
                      <span className={classes.certification}>
                        {details.release_dates.certification}
                      </span>
                    )}{" "}
                    {details.release_dates.release_date && (
                      <span>
                        {DateTime.fromISO(
                          details.release_dates.release_date
                        ).toFormat("MM/dd/yyyy")}
                      </span>
                    )}{" "}
                    {details.release_dates.iso_3166_1 && (
                      <span>
                        {`(${details.release_dates.iso_3166_1})`} {" \u2022 "}
                      </span>
                    )}
                  </>
                )}
                {details.genres &&
                  details.genres.map((genre, index) => (
                    <span key={genre.id}>
                      <Link to="#">{genre.name}</Link>
                      {index < details.genres.length - 1 && ", "}
                    </span>
                  ))}
                {details.runtime > 0 && (
                  <span>
                    {" \u2022 "}
                    {
                      // minute => hour:minute
                      details.runtime >= 60
                        ? Math.floor(details.runtime / 60) +
                          "h " +
                          (details.runtime % 60) +
                          "m"
                        : details.runtime + "m"
                    }
                  </span>
                )}
              </Typography>
            </Grid>
            <Grid item container spacing={3} alignItems="center">
              <Grid item className={classes.styledDoughnut}>
                <StyledDoughnut vote_average={details.vote_average} size={60} />
              </Grid>
              <Grid item>
                <Typography>
                  <b>
                    User
                    <br />
                    Score
                  </b>
                </Typography>
              </Grid>
              {(details.media_type === "movie" ||
                details.media_type === "tv") && (
                <Grid item className={classes.wrapper}>
                  <Tooltip
                    arrow
                    title={
                      !isAuth
                        ? "Login to add this movie to your watchlist"
                        : !isAdded
                        ? "Add to your watchlist"
                        : "Remove from your watchlist"
                    }
                  >
                    <Fab
                      size="medium"
                      color="primary"
                      onClick={
                        !isAuth
                          ? () =>
                              alert("Login to add this movie to your watchlist")
                          : !isAdded
                          ? () => handleAddMovie()
                          : () => dispatch(removeMovie(details.id))
                      }
                    >
                      <BookmarkIcon
                        fontSize="small"
                        color={!isAdded ? "inherit" : "error"}
                      />
                    </Fab>
                  </Tooltip>
                  {(isLoading || isAdding || isRemoving) && (
                    <CircularProgress
                      size={48}
                      className={classes.fabProgress}
                    />
                  )}
                </Grid>
              )}
            </Grid>
            <Grid item>
              <Typography variant="h6">Overview</Typography>
              <Typography variant="body2">{details.overview}</Typography>
            </Grid>
            <Grid item container spacing={2}>
              {created_by &&
                created_by.map((creator) => (
                  <Grid item key={creator.credit_id} md={4} xs={6}>
                    <Typography
                      variant="subtitle1"
                      component={Link}
                      to={`/person/${creator.id}`}
                    >
                      {creator.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      {creator.department ? creator.department : "Creator"}
                    </Typography>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Details;
