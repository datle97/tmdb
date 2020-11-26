import { useState, useEffect } from "react";
import { makeStyles, Container, Grid } from "@material-ui/core";
import { fetchMovie } from "../../api";
import Loading from "../common/Loading";
import Details from "./Details";
import Media from "./Media";
import SeriesCast from "./SeriesCast";
import Recommendations from "./Recommendations";
import Facts from "./Facts";

const useStyles = makeStyles((theme) => ({
  leftColumn: {
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  rightColumn: {
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(1),
    },
  },
}));

const MoviePage = ({ match }) => {
  const classes = useStyles();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = match.params;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setMovie(await fetchMovie(id));
      setLoading(false);
    };
    fetchData();
  }, [id]);
  return loading ? (
    <Loading />
  ) : (
    <>
      <Details details={movie} created_by={movie.credits.crew.slice(0, 5)} />
      <Container>
        <Grid container spacing={3} justify="center">
          <Grid item md={9} xs={12} className={classes.leftColumn}>
            <SeriesCast
              id={id}
              credits={movie.credits.cast}
              media_type="movie"
            />
            <Media details={movie} />
            <Recommendations
              recommendations={movie.recommendations}
              media_type="movie"
            />
          </Grid>
          <Grid item md={3} xs={12} className={classes.rightColumn}>
            <Facts details={movie} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default MoviePage;
