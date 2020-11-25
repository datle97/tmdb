import {
  Box,
  Button,
  CircularProgress,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
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

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const { handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <Container>
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={classes.form}
      >
        <Controller
          control={control}
          name="username"
          defaultValue=""
          rules={{ required: true }}
          as={
            <TextField
              required
              fullWidth
              variant="outlined"
              autoComplete="username"
              autoFocus
              size="small"
              label="Username"
              margin="normal"
            />
          }
        />
        <Controller
          control={control}
          name="password"
          defaultValue=""
          rules={{ required: "true" }}
          as={
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              type="password"
              autoComplete="current-password"
              size="small"
              label="Password"
              margin="normal"
            />
          }
        />
        {(errors.username || errors.password || error.login) && (
          <div>
            <Typography color="error">
              {error.login
                ? // username or password invalid
                  error.login
                : // errors required
                  "Please enter your username and password"}
            </Typography>
          </div>
        )}
        <Box display="flex" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Button component={Link} to="/" color="primary">
            Cancel
          </Button>
          {loading && <CircularProgress />}
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
