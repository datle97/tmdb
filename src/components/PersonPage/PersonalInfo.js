import { CardMedia, Typography, makeStyles, Tooltip } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    height: 0,
    paddingTop: "150%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      paddingTop: "75%",
    },
  },
  icons: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(2, 0),
    "& > a": {
      marginRight: theme.spacing(2),
    },
  },
}));

const PersonalInfo = ({ details }) => {
  const classes = useStyles();
  return (
    <>
      <div>
        <CardMedia
          image={details.profile_path}
          title={details.name}
          className={classes.cardMedia}
        />
      </div>
      <div className={classes.icons}>
        {details.external_ids.twitter_id && (
          <Tooltip title="Visit Twitter" arrow>
            <a
              href={details.external_ids.twitter_id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon fontSize="large" />
            </a>
          </Tooltip>
        )}
        {details.external_ids.instagram_id && (
          <Tooltip title="Visit Instagram" arrow>
            <a
              href={details.external_ids.instagram_id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon fontSize="large" />
            </a>
          </Tooltip>
        )}
      </div>
      <div>
        <Typography variant="h6">Personal Info</Typography>
      </div>
      <div>
        <Typography variant="subtitle1">Known For</Typography>
        <Typography>{details.known_for_department}</Typography>
      </div>
      <div>
        <Typography variant="subtitle1">Gender</Typography>
        <Typography>{details.gender}</Typography>
      </div>
      <div>
        <Typography variant="subtitle1">Birthday</Typography>
        <Typography>{details.birthday}</Typography>
      </div>
      <div>
        <Typography variant="subtitle1">Place of Birth</Typography>
        <Typography>{details.place_of_birth}</Typography>
      </div>
      <div>
        <Typography variant="subtitle1">Also Known As</Typography>
        <div>
          {details.also_known_as.map((title, index) => (
            <Typography key={index}>{title}</Typography>
          ))}
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
