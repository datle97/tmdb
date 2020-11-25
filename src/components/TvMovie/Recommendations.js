import {
  Typography,
  makeStyles,
  CardMedia,
  Box,
  GridList,
  GridListTile,
  useMediaQuery,
  CardActionArea,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  recommendations: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",

    // gridlist spacing làm mất thanh scroll bottom
    marginBottom: "0 !important",
  },
  cardMedia: {
    height: 0,
    paddingTop: "56.25%",
  },
}));
const Recommendations = ({ recommendations, media_type }) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Recommendations
      </Typography>
      {recommendations.length ? (
        <div className={classes.recommendations}>
          <GridList
            className={classes.gridList}
            cols={matches ? 1.5 : 3.5}
            cellHeight="auto"
            spacing={16}
          >
            {recommendations.slice(0, 9).map((recommendation) => (
              <GridListTile key={recommendation.id}>
                <CardActionArea
                  component={Link}
                  to={`/${media_type}/${recommendation.id}`}
                >
                  <CardMedia
                    className={classes.cardMedia}
                    image={recommendation.backdrop_path}
                    title={recommendation.title}
                  />
                </CardActionArea>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    component={Link}
                    to={`/${media_type}/${recommendation.id}`}
                    noWrap
                  >
                    {recommendation.title}
                  </Typography>
                  <Typography>
                    {recommendation.vote_average * 10 + "%"}
                  </Typography>
                </Box>
              </GridListTile>
            ))}
          </GridList>
        </div>
      ) : (
        <Typography>
          We don't have enough data to suggest any movies based on Santana. You
          can help by rating movies you've seen.
        </Typography>
      )}
    </div>
  );
};

export default Recommendations;
