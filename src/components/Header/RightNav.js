import { useState } from "react";
import {
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import { useSelector } from "react-redux";
import Logged from "./Logged";
import clsx from "clsx";
const useStlyes = makeStyles((theme) => ({
  icon: {
    fontSize: 29,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
  },
  login: {
    marginRight: theme.spacing(3),
  },
  signup: {
    marginRight: theme.spacing(1),
  },
  typography: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  personButton: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "inline-block",
    },
  },
}));

const RightNav = ({ open, handleOpen, handleClose }) => {
  const classes = useStlyes();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, isAuth } = useSelector((state) => state.user);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      keepMounted
      open={!!anchorEl}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
        Login
      </MenuItem>
      <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>
        Sign Up
      </MenuItem>
    </Menu>
  );

  return (
    <>
      {isAuth ? (
        <Logged username={user.username && user.username} />
      ) : (
        <>
          <IconButton onClick={handleMenuOpen} className={classes.personButton}>
            <PersonIcon className={classes.icon} />
          </IconButton>
          <Typography
            component={Link}
            to="/login"
            variant="subtitle1"
            className={clsx(classes.login, classes.typography)}
          >
            Login
          </Typography>
          <Typography
            component={Link}
            to="/signup"
            variant="subtitle1"
            className={clsx(classes.signup, classes.typography)}
          >
            Join TMDb
          </Typography>
        </>
      )}
      {!open ? (
        <IconButton onClick={handleOpen} edge="end">
          <SearchIcon className={classes.icon} />
        </IconButton>
      ) : (
        <IconButton onClick={handleClose} edge="end">
          <CloseIcon className={classes.icon} />
        </IconButton>
      )}
      {renderMenu}
    </>
  );
};

export default RightNav;
