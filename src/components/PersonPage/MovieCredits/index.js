import { useState } from "react";
import { Select, MenuItem, FormControl, makeStyles } from "@material-ui/core";
import CreditTable from "./CreditTable";
import sortByDepartment from "../../common/sortByDepartment";

const useStyles = makeStyles((theme) => ({
  movieCredits: {
    position: "relative",
    "& > div": {
      marginBottom: theme.spacing(2),
    },
  },
  formControl: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

const MovieCredits = ({ cast, crew }) => {
  const classes = useStyles();
  const [value, setValue] = useState("all");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const modifiedCrew = sortByDepartment(crew);

  return (
    <div className={classes.movieCredits}>
      <FormControl className={classes.formControl}>
        <Select value={value} onChange={handleChange} disableUnderline>
          <MenuItem value="all">All ({cast.length + crew.length})</MenuItem>
          {cast.length && (
            <MenuItem value="acting">Acting ({cast.length})</MenuItem>
          )}
          {modifiedCrew.map((crew) => (
            <MenuItem key={crew.department} value={crew.department}>
              {crew.department} ({crew.data.length})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {value === "all" ? (
        <>
          {cast.length > 0 && (
            <CreditTable department="acting" credits={cast} />
          )}
          {modifiedCrew.length > 0 &&
            modifiedCrew.map((crew) => (
              <CreditTable
                key={crew.department}
                department={crew.department}
                credits={crew.data}
              />
            ))}
        </>
      ) : value === "acting" ? (
        <CreditTable department="acting" credits={cast} />
      ) : (
        modifiedCrew
          .filter((crew) => crew.department === value)
          .map((crew) => (
            <CreditTable
              key={crew.department}
              department={crew.department}
              credits={crew.data}
            />
          ))
      )}
    </div>
  );
};

export default MovieCredits;
