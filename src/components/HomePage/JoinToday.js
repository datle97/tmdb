import {
  makeStyles,
  Box,
  Typography,
  Grid,
  Button,
  fade,
} from "@material-ui/core";
import { join_today } from "../../assets";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { purple } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  joinToday: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(0, 6),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "space-around",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(6, 2),
    },
  },
  backdrop: {
    minHeight: 300,
    backgroundPosition: "top center",
    backgroundSize: "cover",
    backgroundImage: `linear-gradient(
      ${fade(purple[800], 0.5)}, 
      ${fade(purple[800], 0.5)}),
      url(${join_today})`,
    color: theme.palette.getContrastText(purple[800]),
  },
  button: {
    marginTop: theme.spacing(3),
    backgroundColor: purple[800],
    color: theme.palette.getContrastText(purple[800]),
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  ul: {
    margin: 0,
    // 20px === padding grid item
    padding: "0 20px",
  },
}));
const JoinToday = () => {
  const classes = useStyles();
  const { isAuth } = useSelector((state) => state.user);
  return (
    <div className={clsx(classes.joinToday, classes.backdrop)}>
      <Box mb={2}>
        <Typography variant="h4">Join Today</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item md={7} xs={12}>
          <Typography>
            Get access to maintain your own custom personal lists, track what
            you've seen and search and filter for what to watch next—regardless
            if it's in theatres, on TV or available on popular streaming
            services like HBO Max, Peacock Premium, BBC America, and AHCTV.
          </Typography>
          {!isAuth && (
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              className={classes.button}
            >
              Sign Up
            </Button>
          )}
        </Grid>
        <Grid item md={5} xs={12}>
          <ul className={classes.ul}>
            <Typography component="li">Enjoy TMDb ad free</Typography>
            <Typography component="li">
              Maintain a personal watchlist
            </Typography>
            <Typography component="li">
              Filter by your subscribed streaming services and find something to
              watch
            </Typography>
            <Typography component="li">
              Log the movies and TV shows you've seen
            </Typography>
            <Typography component="li">Build custom lists </Typography>
            <Typography component="li">
              Contribute to and improve our data
            </Typography>
          </ul>
        </Grid>
      </Grid>
    </div>
  );
};

export default JoinToday;
