import {
  Box,
  CardMedia,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  movieHeader: {
    backgroundColor: blueGrey[700],
    color: theme.palette.getContrastText(blueGrey[700]),
  },
  toolbar: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardMedia: {
    height: 90,
    width: 60,
    borderRadius: 0,
  },
  span: {
    opacity: 0.6,
    fontSize: "1.75rem",
  },
  icon: {
    verticalAlign: "middle",
  },
}));

const MovieHeader = ({ details }) => {
  const classes = useStyles();

  return (
    <div className={classes.movieHeader}>
      <Toolbar className={classes.toolbar}>
        <CardMedia
          component="img"
          image={details.poster_path}
          title={details.title}
          alt={details.title}
          loading="lazy"
          className={classes.cardMedia}
        />
        <Box ml={2}>
          <Typography variant="h4">
            {details.title}{" "}
            <Typography component="span" className={classes.span}>
              ({new Date(details.release_date).getFullYear()})
            </Typography>
          </Typography>
          <Typography
            component={Link}
            to={`/${details.media_type}/${details.id}`}
          >
            <ArrowBackIcon fontSize="small" className={classes.icon} />
            Back to main
          </Typography>
        </Box>
      </Toolbar>
    </div>
  );
};

export default MovieHeader;
