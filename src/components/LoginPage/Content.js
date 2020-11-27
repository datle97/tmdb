import { makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
}));

const Content = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6">Login to your account</Typography>{" "}
      <Typography className={classes.margin}>
        In order to use the editing and rating capabilities of TMDb, as well as
        get personal recommendations you will need to login to your account. If
        you do not have an account, registering for an account is free and
        simple.{" "}
        <Link to="/signup" className={classes.link}>
          Click here
        </Link>{" "}
        to get started.
      </Typography>
      <Typography>
        If you signed up but didn't get your verification email,{" "}
        <Link to="#" className={classes.link}>
          Click here
        </Link>{" "}
        to have it resent.
      </Typography>
    </>
  );
};

export default Content;
