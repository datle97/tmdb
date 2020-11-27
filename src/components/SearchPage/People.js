import React from "react";
import {
  Box,
  CardActionArea,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchPagination from "./SearchPagination";

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    height: 70,
    width: 70,
  },
}));

const People = ({ people, params }) => {
  const classes = useStyles();
  return people.results.length > 0 ? (
    <>
      {people.results.map((person) => (
        <Box key={person.id} display="flex" alignItems="center" mb={1}>
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
              component={Link}
              to={`/person/${person.id}`}
              variant="subtitle1"
            >
              {person.name}
            </Typography>
            <Typography variant="body2">
              {person.known_for_department} •{" "}
              {person.known_for &&
                person.known_for.map((movie, index) => (
                  <React.Fragment key={movie.id}>
                    <Link to={`/${movie.media_type}/${movie.id}`}>
                      {movie.title}
                    </Link>
                    {index < person.known_for.length - 1 && ", "}
                  </React.Fragment>
                ))}
            </Typography>
          </Box>
        </Box>
      ))}
      <SearchPagination total_pages={people.total_pages} params={params} />
    </>
  ) : (
    <Typography>There are no people that matched your query.</Typography>
  );
};

export default People;
