import {
  Avatar,
  Box,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { DateTime } from "luxon";
import { purple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    overflow: "hidden",
  },
  avatar: {
    backgroundColor: purple[800],
    color: theme.palette.getContrastText(purple[800]),
    width: 150,
    height: 150,
    fontSize: 60,
    [theme.breakpoints.down("sm")]: {
      width: 100,
      height: 100,
      fontSize: 45,
    },
  },
  textSecondary: {
    color: "rgba(255, 255, 255, .7)",
  },
}));

const ProfileHeader = ({ user }) => {
  const classes = useStyles();
  return (
    <Toolbar className={classes.toolbar}>
      <Box pr={3} py={3}>
        <Avatar className={classes.avatar} size={100}>
          {user.username && user.username[0].toUpperCase()}
        </Avatar>
      </Box>
      <Box>
        <Typography variant="h4">{user.username}</Typography>
        <Typography className={classes.textSecondary}>
          Member since {DateTime.fromISO(user.createdAt).toFormat("MMMM yyyy")}
        </Typography>
      </Box>
    </Toolbar>
  );
};

export default ProfileHeader;
