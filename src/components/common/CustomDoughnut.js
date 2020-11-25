import { Doughnut } from "react-chartjs-2";
import { fade, makeStyles, Typography } from "@material-ui/core";
import { green, grey, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  customDoughnut: {
    position: "relative",
    borderRadius: "50%",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    padding: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteCenter: (props) => ({
    position: "absolute",
    marginLeft: 2,
    "& > h6": {
      fontSize: props.size / 2.5,
      "& > span": {
        fontSize: props.size / 5,
        verticalAlign: "text-top",
      },
    },
  }),
}));

const CustomDoughnut = ({ vote_average = 0, size }) => {
  const classes = useStyles({ size });
  const data = {
    datasets: [
      {
        data: [vote_average, 10 - vote_average],
        backgroundColor: [
          vote_average >= 7
            ? green["A700"]
            : vote_average >= 4
            ? yellow["A700"]
            : grey[500],
          vote_average >= 7
            ? fade(green["A700"], 0.3)
            : vote_average >= 4
            ? fade(yellow["A700"], 0.3)
            : fade(grey[500], 0.5),
        ],
        pointHoverRadius: 5,
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className={classes.customDoughnut}>
      <Doughnut
        data={data}
        width={size}
        height={size}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 85,
          tooltips: {
            enabled: false,
          },
          hover: {
            mode: null,
          },
          legend: {
            display: false,
          },
        }}
      />
      <div className={classes.absoluteCenter}>
        <Typography variant="subtitle2">
          {Math.round(vote_average * 10)}
          <span>%</span>
        </Typography>
      </div>
    </div>
  );
};

export default CustomDoughnut;
