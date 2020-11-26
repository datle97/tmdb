import { Box, makeStyles, Typography, withStyles } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { green } from "@material-ui/core/colors";

const StyledToggleButton = withStyles((theme) => ({
  root: {
    // Typography subtitle1
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "bold",
    fontSize: "1rem",
    lineHeight: 1.75,
    letterSpacing: "0.00938em",

    color: theme.palette.primary.main,
    textTransform: "none",
    borderRadius: 15,
    padding: theme.spacing(0, 2),
    "&$selected": {
      backgroundColor: theme.palette.primary.main,
      "& $label": {
        color: "#fff",
        // text gradient
        backgroundImage: `linear-gradient(to right, ${green[100]}, ${green["A400"]})`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",

        // cho safari khong nhan WebkitBackgroundClip
        display: "inline",
      },
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  selected: {},
  label: {},
}))(ToggleButton);

const useStyles = makeStyles((theme) => ({
  margin: {
    marginLeft: theme.spacing(2),
  },
}));

const FilterGroup = ({
  title,
  value,
  handleChange,
  value1,
  value2,
  label1,
  label2,
}) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" mt={2} mb={1}>
      <Typography variant="h6">{title}</Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        className={classes.margin}
        size="small"
      >
        <StyledToggleButton value={value1}>{label1}</StyledToggleButton>
        <StyledToggleButton value={value2}>{label2}</StyledToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default FilterGroup;
