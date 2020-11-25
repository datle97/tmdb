import {
  GET_WATCHLIST_REQUEST,
  GET_WATCHLIST_SUCCESS,
  ADD_TO_WATCHLIST_SUCCESS,
  REMOVE_FROM_WATCHLIST_SUCCESS,
  ADD_TO_WATCHLIST_REQUEST,
  REMOVE_FROM_WATCHLIST_REQUEST,
} from "../actions/types";

const initialState = {
  watchlist: [],
  loading: false,
  isAdding: false,
  isRemoving: null,
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WATCHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WATCHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        watchlist: action.watchlist,
      };
    case ADD_TO_WATCHLIST_REQUEST:
      return {
        ...state,
        isAdding: true,
      };
    case ADD_TO_WATCHLIST_SUCCESS:
      return {
        ...state,
        isAdding: false,
        watchlist: [action.movie, ...state.watchlist],
      };
    case REMOVE_FROM_WATCHLIST_REQUEST:
      return {
        ...state,
        isRemoving: action.id,
      };
    case REMOVE_FROM_WATCHLIST_SUCCESS:
      return {
        ...state,
        isRemoving: null,
        watchlist: state.watchlist.filter((movie) => movie.id !== action.id),
      };
    default:
      return state;
  }
};

export default watchlistReducer;
