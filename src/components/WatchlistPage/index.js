import { useEffect, useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlist } from "../../actions/watchlistActions";
import MovieCard from "./MovieCard";
import ProfileHeader from "./ProfileHeader";
import BackgroundHeader from "../common/BackgroundHeader";
import FilterBy from "./FilterBy";
import FilterGroup from "./FilterGroup";
import Loading from "../common/Loading";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginBottom: theme.spacing(1),
  },
}));

const WatchlistPage = () => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.user);
  const { watchlist, loading } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();
  const [type, setType] = useState("movie");
  const [sortBy, setSortBy] = useState("date_added");

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  const handleType = (event, newValue) => {
    setType(newValue);
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };
  const movieList = watchlist.filter((movie) => movie.media_type === "movie");
  const tvList = watchlist.filter((movie) => movie.media_type === "tv");
  return (
    <>
      <BackgroundHeader children={<ProfileHeader user={user} />} />
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Grid container justify="space-between" className={classes.grid}>
              <FilterGroup
                type={type}
                handleType={handleType}
                totalMovie={movieList.length}
                totalTv={tvList.length}
              />
              <FilterBy sortBy={sortBy} handleSortBy={handleSortBy} />
            </Grid>
            {type === "movie" &&
              movieList
                .sort((a, b) =>
                  sortBy === "date_added"
                    ? new Date(b.createdAt) - new Date(a.createdAt)
                    : sortBy === "release_date"
                    ? new Date(b.release_date) - new Date(a.release_date)
                    : b.popularity - a.popularity
                )
                .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            {type === "tv" &&
              tvList
                .sort((a, b) =>
                  sortBy === "date_added"
                    ? new Date(b.createdAt) - new Date(a.createdAt)
                    : sortBy === "release_date"
                    ? new Date(b.release_date) - new Date(a.release_date)
                    : b.popularity - a.popularity
                )
                .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </>
        )}
      </Container>
    </>
  );
};

export default WatchlistPage;
