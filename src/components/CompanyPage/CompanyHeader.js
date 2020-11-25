import { Typography, CardMedia, makeStyles, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "space-between",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  cardMedia: {
    height: 50,
    width: "auto",
    borderRadius: 0,
  },
}));

// dùng cho Company, Keyword
const CompanyHeader = ({ details, movies }) => {
  const classes = useStyles();
  return (
    <Toolbar className={classes.toolbar}>
      {details.logo_path ? (
        <CardMedia
          component="img"
          image={details.logo_path}
          alt={details.name}
          title={details.name}
          loading="lazy"
          className={classes.cardMedia}
        />
      ) : (
        <Typography variant="h5">{details.name}</Typography>
      )}
      <Typography variant="h6">{movies.total_results} movies</Typography>
    </Toolbar>
  );
};

export default CompanyHeader;
