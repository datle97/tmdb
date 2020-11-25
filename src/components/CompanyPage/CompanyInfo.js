import { Typography, makeStyles, Toolbar } from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PublicIcon from "@material-ui/icons/Public";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles((theme) => ({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  toolbar: {
    "& > div": {
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(3),
      whiteSpace: "nowrap",
      "& :first-child": {
        marginRight: 4,
      },
    },
  },
}));
const CompanyInfo = ({ details }) => {
  const classes = useStyles();
  return (
    <div className={classes.overlay}>
      <Toolbar className={classes.toolbar} variant="dense">
        {details.name && (
          <div>
            <AssignmentIndIcon fontSize="small" />
            <Typography>{details.name}</Typography>
          </div>
        )}
        {details.headquarters && (
          <div>
            <LocationOnIcon fontSize="small" />
            <Typography noWrap>{details.headquarters}</Typography>
          </div>
        )}
        {details.origin_country && (
          <div>
            <PublicIcon fontSize="small" />
            <Typography>{details.origin_country}</Typography>
          </div>
        )}
        {details.homepage && (
          <div>
            <LinkIcon fontSize="small" />
            <Typography component={"a"} href={details.homepage} target="_blank">
              Home Page
            </Typography>
          </div>
        )}
      </Toolbar>
    </div>
  );
};

export default CompanyInfo;
