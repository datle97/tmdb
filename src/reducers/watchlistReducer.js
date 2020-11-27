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
} from "../actions/types";

const initialState = {
  watchlist: [],
  isLoading: false,
  isAdding: false,
  isRemoving: null,
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WATCHLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_WATCHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        watchlist: action.watchlist,
      };
    case GET_WATCHLIST_FAILURE:
      return {
        ...state,
        isLoading: false,
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
    case ADD_TO_WATCHLIST_FAILURE:
      return {
        ...state,
        isAdding: false,
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
    case REMOVE_FROM_WATCHLIST_FAILURE:
      return {
        ...state,
        isRemoving: null,
      };
    default:
      return state;
  }
};

export default watchlistReducer;
