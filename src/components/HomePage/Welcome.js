import { fade, makeStyles, Typography } from "@material-ui/core";
import Search from "../Header/Search";

const useStyles = makeStyles((theme) => ({
  backdrop: (props) => ({
    height: 350,
    backgroundPosition: "top center",
    backgroundSize: "cover",
    backgroundImage: `linear-gradient(to right,
      ${fade(theme.palette.secondary.main, 0.9)},
      ${fade(theme.palette.primary.main, 0.9)}),
      url(${props.backdrop})`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  }),
  welcome: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
}));
const Welcome = ({ backdrop }) => {
  const classes = useStyles({ backdrop });
  return (
    <div className={classes.backdrop}>
      <div className={classes.welcome}>
        <div>
          <Typography variant="h3">Welcome.</Typography>
          <Typography variant="h5">
            Millions of movies, TV shows and people to discover. Explore now.
          </Typography>
        </div>
        <Search handleClose={() => null} />
      </div>
    </div>
  );
};

export default Welcome;
