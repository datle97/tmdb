import { useState, useEffect } from "react";
import { makeStyles, Container, Grid } from "@material-ui/core";
import { fetchTvShow } from "../../api";
import Loading from "../common/Loading";
import Details from "./Details";
import Media from "./Media";
import SeriesCast from "./SeriesCast";
import Recommendations from "./Recommendations";
import Facts from "./Facts";
import LastSeason from "./LastSeason";

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

const TvPage = ({ match }) => {
  const classes = useStyles();
  const [tvShow, setTvShow] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = match.params;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTvShow(await fetchTvShow(id));
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Details
        details={tvShow}
        release_dates={tvShow.release_dates}
        created_by={tvShow.created_by}
      />
      <Container>
        <Grid container spacing={3} justify="center">
          <Grid item md={9} xs={12} className={classes.leftColumn}>
            <SeriesCast id={id} credits={tvShow.credits.cast} media_type="tv" />
            <LastSeason
              last_season={tvShow.seasons[tvShow.seasons.length - 1]}
            />
            <Media video={tvShow.videos} details={tvShow} />
            <Recommendations
              recommendations={tvShow.recommendations}
              media_type="tv"
            />
          </Grid>
          <Grid item md={3} xs={12} className={classes.rightColumn}>
            <Facts
              details={tvShow}
              networks={tvShow.networks}
              keywords={tvShow.keywords}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default TvPage;
