import {
  Typography,
  GridList,
  GridListTile,
  Divider,
  makeStyles,
  Card,
  CardMedia,
  Box,
  useMediaQuery,
  CardActionArea,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  seriesCast: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexGrow: 1,
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    marginBottom: "0 !important",
  },
  card: {
    height: "100%",
  },
  cardMedia: {
    height: 0,
    paddingTop: "130%",
    borderRadius: 0,
  },
  cardActionArea: {
    borderRadius: 0,
  },
  viewMore: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
  },
  icon: {
    verticalAlign: "middle",
  },
}));
const SeriesCast = ({ id, credits, media_type }) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <>
      <div>
        <Typography variant="h6" gutterBottom>
          Cast
        </Typography>
        <div className={classes.seriesCast}>
          <GridList
            className={classes.gridList}
            cellHeight="auto"
            cols={matches ? 2.5 : 5.5}
            spacing={8}
          >
            {credits.slice(0, 9).map((cast) => (
              <GridListTile key={cast.credit_id}>
                <Card className={classes.card}>
                  <CardActionArea
                    component={Link}
                    to={`/person/${cast.id}`}
                    className={classes.cardActionArea}
                  >
                    <CardMedia
                      image={cast.profile_path}
                      title={cast.name}
                      className={classes.cardMedia}
                    />
                  </CardActionArea>
                  <Box m={1}>
                    <Typography
                      variant="subtitle1"
                      component={Link}
                      to={`/person/${cast.id}`}
                    >
                      {cast.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      {cast.character}
                    </Typography>
                  </Box>
                </Card>
              </GridListTile>
            ))}
            {credits.length >= 9 && (
              <GridListTile className={classes.viewMore}>
                <Link to={`/${media_type}/${id}/cast`}>
                  View more
                  <ArrowForwardIcon className={classes.icon} />
                </Link>
              </GridListTile>
            )}
          </GridList>
        </div>
      </div>
      <div>
        <Typography
          component={Link}
          to={`/${media_type}/${id}/cast`}
          variant="subtitle1"
        >
          Full Cast & Crew
        </Typography>
      </div>
      <Divider />
    </>
  );
};

export default SeriesCast;
