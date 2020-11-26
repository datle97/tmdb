import { useState, useEffect } from "react";
import { fetchPerson } from "../../api";
import { Grid, Container, makeStyles } from "@material-ui/core";
import PersonalInfo from "./PersonalInfo";
import Biography from "./Biography";
import KnownFor from "./KnownFor";
import MovieCredits from "./MovieCredits";
import Loading from "../common/Loading";

const useStyles = makeStyles((theme) => ({
  leftColumn: {
    "& > *": {
      marginBottom: theme.spacing(1),
    },
  },
  rightColumn: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

const PersonPage = ({ match }) => {
  const classes = useStyles();
  const { id } = match.params;
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setPerson(await fetchPerson(id));
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12} className={classes.leftColumn}>
          <PersonalInfo details={person} />
        </Grid>
        <Grid item md={9} xs={12} className={classes.rightColumn}>
          <Biography details={person} />
          <KnownFor
            credits={
              person.movie_credits.cast.length
                ? person.movie_credits.cast
                : person.movie_credits.crew
            }
          />
          <MovieCredits
            cast={person.movie_credits.cast}
            crew={person.movie_credits.crew}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PersonPage;
