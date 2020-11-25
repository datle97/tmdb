import { fade, makeStyles } from "@material-ui/core";
import { company_header } from "../../assets";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "relative",
    backgroundImage: `linear-gradient(to right, 
      ${fade(theme.palette.secondary.main, 0.8)}, 
      ${fade(theme.palette.primary.main, 0.8)}),
      url(${company_header})`,
    backgroundSize: "cover",
    backgroundPosition: "right bottom",
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));

const BackgroundHeader = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.header}>{children}</div>;
};

export default BackgroundHeader;
