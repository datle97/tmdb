import {
  Box,
  CardActionArea,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  cardMedia: {
    height: 70,
    width: 70,
    borderRadius: 5,
  },
}));

const PersonCard = ({ person }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <CardActionArea
        component={Link}
        to={`/person/${person.id}`}
        className={classes.cardMedia}
      >
        <CardMedia
          component="img"
          image={person.profile_path}
          title={person.name}
          alt={person.name}
          loading="lazy"
          className={classes.cardMedia}
        />
      </CardActionArea>
      <Box ml={2}>
        <Typography
          variant="subtitle1"
          component={Link}
          to={`/person/${person.id}`}
        >
          {person.name}
        </Typography>
        <Typography variant="body2">{person.character}</Typography>
      </Box>
    </Box>
  );
};

export default PersonCard;
