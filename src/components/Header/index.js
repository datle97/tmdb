import { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Collapse } from "@material-ui/core/";
import Search from "./Search";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  collapse: {
    backgroundColor: "white",
    zIndex: 1,
  },
  search: {
    minHeight: "auto",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);
  const handleOpen = () => {
    setOpen(true);

    // Collapse hidden không thể autofocus input => dùng setTimeout(0)
    setTimeout(() => {
      // searchRef = Autocomplete > div > input
      searchRef.current.children[0].children[0].focus();
    }, 0);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <LeftNav />
          <div className={classes.grow} />
          <RightNav
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </Toolbar>
      </AppBar>
      <Collapse in={open} className={classes.collapse}>
        <Toolbar className={classes.search}>
          <Search
            paddingLeft={0}
            handleClose={handleClose}
            searchRef={searchRef}
          />
        </Toolbar>
      </Collapse>
    </div>
  );
};

export default Header;
