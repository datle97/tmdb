import { useState } from "react";
import {
  Typography,
  Box,
  CardMedia,
  makeStyles,
  Tabs,
  Tab,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
  cardVideo: {
    width: 500,
    height: "100%",
  },
  cardMedia: {
    height: "100%",
    width: "auto",
    borderRadius: 0,
  },
}));
const Media = ({ details }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Media
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabs}
          >
            <Tab label="Video" />
            <Tab label="Backdrop" />
            <Tab label="Poster" />
          </Tabs>
        </Box>
        <Box display="flex" alignItems="center" height={300}>
          {value === 0 &&
            (details.videos.key ? (
              <CardMedia
                component="iframe"
                className={classes.cardVideo}
                src={details.videos.key}
              />
            ) : (
              <Typography>This video is unavailable</Typography>
            ))}
          {value === 1 && (
            <CardMedia
              component="img"
              image={details.backdrop_path}
              title={details.title}
              alt={details.title}
              loading="lazy"
              className={classes.cardMedia}
            />
          )}
          {value === 2 && (
            <CardMedia
              component="img"
              image={details.poster_path}
              title={details.title}
              alt={details.title}
              loading="lazy"
              className={classes.cardMedia}
            />
          )}
        </Box>
      </div>
      <Divider />
    </>
  );
};

export default Media;
