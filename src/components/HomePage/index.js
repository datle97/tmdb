import { useState, useEffect } from "react";
import { makeStyles, Container, Fade } from "@material-ui/core";
import { fetchPopular, fetchTrending } from "../../api";
import Welcome from "./Welcome";
import JoinToday from "./JoinToday";
import FilterGroup from "./FilterGroup";
import MovieGridList from "./MovieGridList";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 0,
    paddingBottom: 0,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  buttonGroup: {
    marginLeft: theme.spacing(2),
  },
  box: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2),
    },
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [backdrop, setBackdrop] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const popularData = await fetchPopular("movie");
      const randomBackdrop =
        popularData[Math.floor(Math.random() * popularData.length)]
          .backdrop_path;
      setBackdrop(randomBackdrop);
    };
    fetchData();
  }, []);

  const [popular, setPopular] = useState([]);
  const [type, setType] = useState("movie");
  const [typeChecked, setTypeChecked] = useState(false);
  const timeout = 300;
  useEffect(() => {
    setTypeChecked(false);
    // typeChecked false => true trong thời gian timeout === thời gian Fade timeout
    const fetchData = setTimeout(async () => {
      setPopular(await fetchPopular(type));
      setTypeChecked(true);
    }, timeout);
    return () => clearTimeout(fetchData);
  }, [type]);

  const [trending, setTrending] = useState([]);
  const [time, setTime] = useState("day");
  const [timeChecked, setTimeChecked] = useState(false);
  useEffect(() => {
    setTimeChecked(false);
    // timeChecked false => true trong thời gian timeout === thời gian Fade timeout
    const fetchData = setTimeout(async () => {
      setTrending(await fetchTrending(time));
      setTimeChecked(true);
    }, timeout);
    return () => clearTimeout(fetchData);
  }, [time]);

  const handleType = (event, newValue) => {
    if (newValue !== null) {
      setType(newValue);
    }
  };

  const handleTime = (event, newValue) => {
    if (newValue !== null) {
      setTime(newValue);
    }
  };

  return (
    <Container className={classes.container}>
      <Welcome backdrop={backdrop} />
      <div className={classes.box}>
        <FilterGroup
          title="What's popular"
          value={type}
          handleChange={handleType}
          value1="movie"
          value2="tv"
          label1="Movies"
          label2="Tv"
        />
        <Fade in={typeChecked} timeout={timeout}>
          <div>
            <MovieGridList movies={popular} />
          </div>
        </Fade>
        <FilterGroup
          title="Trending"
          value={time}
          handleChange={handleTime}
          value1="day"
          value2="week"
          label1="Today"
          label2="This Week"
        />
        <Fade in={timeChecked} timeout={timeout}>
          <div>
            <MovieGridList movies={trending} />
          </div>
        </Fade>
      </div>
      <JoinToday />
    </Container>
  );
};

export default HomePage;
