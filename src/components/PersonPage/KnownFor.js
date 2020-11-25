import {
  Typography,
  GridList,
  GridListTile,
  CardMedia,
  makeStyles,
  useMediaQuery,
  CardActionArea,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  divGridList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexGrow: 1,
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    // GridList spacing làm mất thanh scroll
    marginBottom: "0 !important",
  },
  cardMedia: {
    height: 0,
    paddingTop: "150%",
  },
}));
const KnownFor = ({ credits }) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Known For
      </Typography>
      <div className={classes.divGridList}>
        <GridList
          className={classes.gridList}
          cols={matches ? 2.5 : 6.5}
          cellHeight="auto"
          spacing={8}
        >
          {credits.slice(0, 9).map((credit) => (
            <GridListTile key={credit.credit_id}>
              <CardActionArea component={Link} to={`/movie/${credit.id}`}>
                <CardMedia
                  image={credit.poster_path}
                  title={credit.title}
                  className={classes.cardMedia}
                />
              </CardActionArea>
              <Typography component={Link} to={`/movie/${credit.id}`}>
                {credit.title}
              </Typography>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};

export default KnownFor;
