import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";
import { purple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  purple: {
    backgroundColor: purple[800],
    color: theme.palette.getContrastText(purple[800]),
  },
}));

const Logged = ({ username }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

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
      <MenuItem component={Link} to="/watchlist" onClick={handleMenuClose}>
        Watchlist
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          dispatch(logout());
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <IconButton
        edge="end"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        size="small"
      >
        <Avatar className={classes.purple}>
          {username && username[0].toUpperCase()}
        </Avatar>
      </IconButton>
      {renderMenu}
    </>
  );
};

export default Logged;
