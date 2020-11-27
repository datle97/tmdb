import { Box, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  ul: {
    listStyleType: "none",
    margin: 0,
    padding: theme.spacing(0, 2),
    "& > li": {
      display: "flex",
      margin: theme.spacing(2, 0),
      "& > svg": {
        marginRight: theme.spacing(1),
      },
    },
  },
}));

const Benefits = () => {
  const classes = useStyles();
  return (
    <Grid item md={3}>
      <Card>
        <Box px={3} py={2} bgcolor="primary.main" color="white">
          <Typography variant="h6">Benefits of being a member</Typography>
        </Box>
        <ul className={classes.ul}>
          <Typography component="li">
            <CheckIcon />
            Find something to watch on your subscribed streaming services
          </Typography>
          <Typography component="li">
            <CheckIcon />
            Log the movies and TV shows you have watched
          </Typography>
          <Typography component="li">
            <CheckIcon />
            Keep track of your favourite movies and TV shows and get
            recommendations from them
          </Typography>
          <Typography component="li">
            <CheckIcon />
            Build and maintain a personal watchlist
          </Typography>
          <Typography component="li">
            <CheckIcon />
            Build custom mixed lists (movies and TV)
          </Typography>
          <Typography component="li">
            <CheckIcon />
            Take part in movie and TV discussions
          </Typography>
          <Typography component="li">
            <CheckIcon />
            Contribute to, and improve the information in our database
          </Typography>
        </ul>
      </Card>
    </Grid>
  );
};

export default Benefits
