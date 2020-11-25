import {
  Card,
  CardMedia,
  Typography,
  makeStyles,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    height: 150,

    marginBottom: theme.spacing(3),
  },
  cardMedia: {
    height: "100%",
    width: 100,
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
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const MovieCard = ({ details, media_type = "movie" }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea
        component={Link}
        to={`/${media_type}/${details.id}`}
        className={classes.cardMedia}
      >
        <CardMedia
          component="img"
          image={details.poster_path}
          title={details.title}
          alt={details.title}
          loading="lazy"
          className={classes.cardMedia}
        />
      </CardActionArea>
      <CardContent className={classes.cardContent}>
        <div>
          <Typography
            variant="subtitle1"
            component={Link}
            to={`/${media_type}/${details.id}`}
          >
            {details.title}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {details.release_date &&
              DateTime.fromISO(details.release_date).toFormat("MMMM dd, yyyy")}
          </Typography>
        </div>
        <div className={classes.overview}>
          <Typography>{details.overview}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
