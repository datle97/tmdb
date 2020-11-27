import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.user);
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    data.username = data.username.toLowerCase();
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
        {isLoading && <CircularProgress />}
      </Box>
    </form>
  );
};

export default LoginForm;
