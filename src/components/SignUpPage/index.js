import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../actions/userActions";
import { Link } from "react-router-dom";

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
  margin: {
    margin: theme.spacing(2, 0),
  },
}));

const SignUpPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control, errors } = useForm();
  const { error, loading } = useSelector((state) => state.user);
  const onSubmit = (data) => {
    dispatch(signUp(data));
  };

  return (
    <Container>
      <Grid container spacing={3}>
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
        <Grid item md={9}>
          <Box mb={1}>
            <Typography variant="h5">Sign up for an account</Typography>
            <Typography>
              Signing up for an account is free and easy. Fill out the form
              below to get started. JavaScript is required to to continue.
            </Typography>
          </Box>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Controller
              control={control}
              name="firstName"
              defaultValue=""
              as={
                <TextField
                  fullWidth
                  autoFocus
                  variant="outlined"
                  size="small"
                  autoComplete="fname"
                  label="First Name"
                  margin="normal"
                />
              }
            />
            <Controller
              control={control}
              name="lastName"
              defaultValue=""
              as={
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  autoComplete="fname"
                  label="Last Name"
                  margin="normal"
                />
              }
            />
            <Controller
              control={control}
              name="username"
              defaultValue=""
              rules={{ required: true, minLength: 6 }}
              as={
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  autoComplete="username"
                  label="Username"
                  margin="normal"
                  error={!!(errors.username || error.signup)}
                  helperText={
                    error.signup
                      ? // username has already been taken
                        error.signup
                      : errors.username &&
                        (errors.username.type === "required"
                          ? "Please enter your username"
                          : errors.username.type === "minLength"
                          ? "Username must be at least 6 characters"
                          : null)
                  }
                />
              }
            />
            <Controller
              control={control}
              name="password"
              defaultValue=""
              rules={{ required: true, minLength: 6 }}
              as={
                <TextField
                  required
                  fullWidth
                  type="password"
                  variant="outlined"
                  size="small"
                  autoComplete="current-password"
                  error={!!errors.password}
                  label="Password"
                  margin="normal"
                  helperText={
                    errors.password &&
                    (errors.password.type === "required"
                      ? "Please enter your password"
                      : errors.password.type === "minLength"
                      ? "Password must be at least 6 characters"
                      : null)
                  }
                />
              }
            />
            <Typography className={classes.margin}>
              By clicking the "Sign up" button below, I certify that I have read
              and agree to the TMDb terms of use and privacy policy.
            </Typography>
            <Box display="flex">
              <Button type="submit" variant="contained" color="primary">
                Sign Up
              </Button>
              <Button component={Link} to="/" color="primary">
                Cancel
              </Button>
              {loading && <CircularProgress />}
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUpPage;
