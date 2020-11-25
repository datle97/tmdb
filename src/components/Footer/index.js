import {
  Container,
  Grid,
  Typography,
  Button,
  makeStyles,
  CardMedia,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logo_footer } from "../../assets";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(6, 0),
    marginTop: "auto",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },

  grid: {
    "& > div > p > a": {
      display: "block",
      width: "fit-content",
      color: theme.palette.getContrastText(theme.palette.primary.main),
      "&:hover": {
        textDecoration: "none",
      },
    },
  },
  button: {
    color: theme.palette.primary.main,
  },
  join: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  logo: {
    width: 120,
    borderRadius: 0,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
const Footer = () => {
  const classes = useStyles();
  const { user, isAuth } = useSelector((state) => state.user);
  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Grid container justify="space-between" spacing={2}>
          <Grid item md={3} className={classes.join}>
            <CardMedia
              component="img"
              image={logo_footer}
              title="logo"
              alt="logo"
              className={classes.logo}
            />
            {isAuth ? (
              <Button component={Link} to="/watchlist" variant="contained">
                <Typography color="primary" variant="subtitle1">
                  Hi {user.username}!
                </Typography>
              </Button>
            ) : (
              <Button component={Link} to="/signup" variant="contained">
                <Typography color="primary" variant="subtitle1">
                  JOIN THE COMMUNITY
                </Typography>
              </Button>
            )}
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
            container
            justify="space-between"
            spacing={2}
            className={classes.grid}
          >
            <Grid item md="auto" xs={12}>
              <Typography variant="h6">THE BASICS</Typography>
              <Typography>
                <Link to="#">About TMDb</Link>
                <Link to="#">Contact Us</Link>
                <Link to="#">Support Forums</Link>
                <Link to="#">API</Link>
                <Link to="#">System Status</Link>
              </Typography>
            </Grid>
            <Grid item md="auto" xs={12}>
              <Typography variant="h6">GET INVOLVED</Typography>
              <Typography>
                <Link to="#">Contribution Bible</Link>
                <Link to="#">3rd Party Applications</Link>
                <Link to="#">Add New Movie</Link>
                <Link to="#">Add New TV Show</Link>
              </Typography>
            </Grid>
            <Grid item md="auto" xs={12}>
              <Typography variant="h6">COMMUNITY</Typography>
              <Typography>
                <Link to="#">Guidelines</Link>
                <Link to="#">Discussions</Link>
                <Link to="#">Leaderboard</Link>
                <Link to="#">Twitter</Link>
              </Typography>
            </Grid>
            <Grid item md="auto" xs={12}>
              <Typography variant="h6">LEGAL</Typography>
              <Typography>
                <Link to="#">Terms of Use</Link>
                <Link to="#">API Terms of Use</Link>
                <Link to="#">Privacy Policy</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
