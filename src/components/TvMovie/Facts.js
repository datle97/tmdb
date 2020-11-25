import { Typography, makeStyles, Tooltip, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles((theme) => ({
  keyword: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const Facts = ({ details, keywords, networks }) => {
  const classes = useStyles();
  // language code => language name
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames
  const languageNames = new Intl.DisplayNames(["en"], {
    type: "language",
  });

  return (
    <>
      <div>
        <Tooltip title="Visit Homepage" placement="top" arrow>
          <a href={details.homepage} target="_blank" rel="noopener noreferrer">
            <LinkIcon fontSize="large" />
          </a>
        </Tooltip>
      </div>
      <div>
        <Typography variant="subtitle1">Status</Typography>
        <Typography variant="body2">{details.status}</Typography>
      </div>
      <div>
        <Typography variant="subtitle1">Original Language</Typography>
        <Typography variant="body2">
          {languageNames.of(details.original_language)}
        </Typography>
      </div>
      {!isNaN(details.budget) && (
        <>
          <div>
            <Typography variant="subtitle1">Budget</Typography>
            <Typography variant="body2">
              {details.budget ? "$" + details.budget.toLocaleString() : "-"}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">Revenue</Typography>
            <Typography variant="body2">
              {details.revenue ? "$" + details.revenue.toLocaleString() : "-"}
            </Typography>
          </div>
        </>
      )}
      {networks && (
        <>
          <div>
            <Typography variant="subtitle1">Network</Typography>
            {networks.logo_path ? (
              <Link to="#">
                <img
                  src={networks.logo_path}
                  alt={networks.name}
                  title={networks.name}
                />
              </Link>
            ) : (
              "-"
            )}
          </div>
          <div>
            <Typography variant="subtitle1">Type</Typography>
            <Typography variant="body2">{details.type}</Typography>
          </div>
        </>
      )}
      <div>
        <Typography variant="subtitle1">Keywords</Typography>
        {keywords.length ? (
          keywords.map((keyword) => (
            <Button
              key={keyword.id}
              component={Link}
              to={`/keyword/${keyword.id}`}
              variant="contained"
              color="primary"
              className={classes.keyword}
            >
              <Typography variant="body2">{keyword.name}</Typography>
            </Button>
          ))
        ) : (
          <Typography>No keywords have been added.</Typography>
        )}
      </div>
    </>
  );
};

export default Facts;
