import { useEffect, useState } from "react";
import { InputBase, fade, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import { searchMovies } from "../../api";
import useDebounce from "../common/useDebounce";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: "0 !important",
    width: "100%",
  },
  searchIcon: (props) => ({
    padding: theme.spacing(0, props.paddingLeft),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: (props) => ({
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(props.paddingLeft + 2)}px)`,
    width: "100%",
  }),
}));

const Search = ({ paddingLeft = 2, searchRef, handleClose }) => {
  const classes = useStyles({ paddingLeft });
  const [options, setOptions] = useState([]);
  // default options === search "the"
  const [inputValue, setInputValue] = useState("the");
  const debouncedInput = useDebounce(inputValue, 500);
  const history = useHistory();

  useEffect(() => {
    if (debouncedInput) {
      const fetchData = async () => {
        const searchResults = await searchMovies(debouncedInput, 1);
        setOptions(searchResults.results.map((movie) => movie.title));
      };
      fetchData();
    }
  }, [debouncedInput]);

  // click option và redirect sang trang search
  const handleChange = (event, newValue) => {
    if (newValue) {
      history.push(`/search/movie/${newValue}/1`);
      handleClose();
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  // press Enter
  const getSearch = (event) => {
    event.preventDefault();
    if (inputValue) {
      history.push(`/search/movie/${inputValue}/1`);
      handleClose();
    }
  };
  return (
    <form onSubmit={getSearch} className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Autocomplete
        freeSolo
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={options}
        ref={searchRef}
        renderInput={(params) => (
          <InputBase
            ref={params.InputProps.ref}
            inputProps={{ ...params.inputProps }}
            placeholder="Search for a movie, tv show, person..."
            autoFocus
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        )}
      />
    </form>
  );
};

export default Search;
