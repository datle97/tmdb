import { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Card,
  Box,
  makeStyles,
  CardMedia,
  Popover,
  CardActionArea,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import StarRateIcon from "@material-ui/icons/StarRate";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cellTitle: {
    paddingLeft: theme.spacing(1),
    width: "90%",
  },
  cellIcon: {
    padding: "6px 0",
    textAlign: "center",
  },
  card: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  cardMedia: {
    height: 150,
    width: 100,
    borderRadius: 0,
  },
  cardContent: {
    width: 400,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    alignSelf: "flex-start",
    margin: theme.spacing(0, 2),
  },
  voteAverage: {
    display: "inline-flex",
    padding: "3px 10px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    borderRadius: 15,
    fontSize: 15,
  },
}));

const Row = ({ row }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <TableRow key={row.id}>
        <TableCell align="center" padding="none">
          {row.release_date ? new Date(row.release_date).getFullYear() : "—"}
        </TableCell>
        <TableCell align="left" className={classes.cellIcon}>
          <IconButton size="small" onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
        </TableCell>
        <TableCell className={classes.cellTitle}>
          <Typography
            component={Link}
            to={`/movie/${row.id}`}
            variant="subtitle2"
          >
            {row.title}
          </Typography>
          {row.character && (
            <Typography variant="body2" color="textSecondary" component="span">
              {" "}
              as {row.character}
            </Typography>
          )}
          {row.job && (
            <Typography variant="body2" color="textSecondary" component="span">
              {" "}
              ... {row.job}
            </Typography>
          )}
        </TableCell>
      </TableRow>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Card className={classes.card}>
          <CardActionArea
            component={Link}
            to={`/movie/${row.id}`}
            className={classes.cardMedia}
          >
            <CardMedia
              component="img"
              image={row.poster_path}
              title={row.title}
              alt={row.title}
              loading="lazy"
              className={classes.cardMedia}
            />
          </CardActionArea>
          <Box className={classes.cardContent}>
            <Box display="flex" alignItems="baseline">
              <Typography
                component={Link}
                to={`/movie/${row.id}`}
                variant="h6"
                noWrap
                gutterBottom
              >
                {row.title}
              </Typography>

              <span className={classes.voteAverage}>
                <StarRateIcon fontSize="small" />
                {row.vote_average.toFixed(1)}
              </span>
            </Box>
            <Typography>{row.overview}</Typography>
          </Box>
        </Card>
      </Popover>
    </>
  );
};

export default Row;
