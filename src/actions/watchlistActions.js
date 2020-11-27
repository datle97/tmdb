import axios from "axios";
import {
  GET_WATCHLIST_REQUEST,
  GET_WATCHLIST_SUCCESS,
  GET_WATCHLIST_FAILURE,
  ADD_TO_WATCHLIST_REQUEST,
  ADD_TO_WATCHLIST_SUCCESS,
  ADD_TO_WATCHLIST_FAILURE,
  REMOVE_FROM_WATCHLIST_REQUEST,
  REMOVE_FROM_WATCHLIST_SUCCESS,
  REMOVE_FROM_WATCHLIST_FAILURE,
} from "./types";

export const authHeader = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    // set headers gửi lên server => server check jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
};

export const fetchWatchlist = () => async (dispatch) => {
  dispatch(getWatchListRequest());
  try {
    const { data } = await axios.get(
      `https://agile-savannah-25594.herokuapp.com/watchlist/`,
      {
        headers: authHeader(),
      }
    );
    dispatch(getWatchListSuccess(data.watchlist));
  } catch (err) {
    dispatch(getWatchListError());
    console.log(err.response);
  }
};

export const addMovie = (movie) => async (dispatch) => {
  dispatch(addToWatchlistRequest());
  try {
    const { data } = await axios.post(
      "https://agile-savannah-25594.herokuapp.com/watchlist/add",
      { movie },
      { headers: authHeader() }
    );
    dispatch(addToWatchlistSuccess(data));
  } catch (err) {
    dispatch(addToWatchlistError());
    console.log(err.response);
  }
};

export const removeMovie = (id) => async (dispatch) => {
  dispatch(removeFromWatchlistRequest(id));
  try {
    const { data } = await axios.post(
      "https://agile-savannah-25594.herokuapp.com/watchlist/remove",
      { id },
      { headers: authHeader() }
    );
    dispatch(removeFromWatchlistSuccess(data.id));
  } catch (err) {
    dispatch(removeFromWatchlistError());
    console.log(err.response);
  }
};

const getWatchListRequest = () => ({
  type: GET_WATCHLIST_REQUEST,
});

const getWatchListSuccess = (watchlist) => ({
  type: GET_WATCHLIST_SUCCESS,
  watchlist,
});

const getWatchListError = () => ({
  type: GET_WATCHLIST_FAILURE,
});

const addToWatchlistRequest = () => ({
  type: ADD_TO_WATCHLIST_REQUEST,
});

const addToWatchlistSuccess = (movie) => ({
  type: ADD_TO_WATCHLIST_SUCCESS,
  movie,
});

const addToWatchlistError = () => ({
  type: ADD_TO_WATCHLIST_FAILURE,
});

const removeFromWatchlistRequest = (id) => ({
  type: REMOVE_FROM_WATCHLIST_REQUEST,
  id,
});

const removeFromWatchlistSuccess = (id) => ({
  type: REMOVE_FROM_WATCHLIST_SUCCESS,
  id,
});

const removeFromWatchlistError = () => ({
  type: REMOVE_FROM_WATCHLIST_FAILURE,
});
