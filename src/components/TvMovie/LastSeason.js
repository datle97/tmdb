import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 200,
    display: "flex",
  },
  cardMedia: {
    height: "100%",
    width: "calc(200px / 1.5)",
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
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const LastSeason = ({ last_season }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6">Last Season</Typography>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          image={last_season.poster_path}
          alt={last_season.name}
          title={last_season.name}
          loading="lazy"
          className={classes.cardMedia}
        />
        <CardContent className={classes.cardContent}>
          <div>
            <Typography variant="h6">
              <Box lineHeight="normal">{last_season.name} </Box>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {new Date(last_season.air_date).getFullYear()} |{" "}
              {last_season.episode_count} Episodes
            </Typography>
          </div>
          {last_season.overview && (
            <div className={classes.overview}>
              <Typography>{last_season.overview}</Typography>
            </div>
          )}
        </CardContent>
      </Card>
      <Divider />
    </>
  );
};

export default LastSeason;
