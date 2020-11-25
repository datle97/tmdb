import { combineReducers } from "redux";
import userReducer from "./userReducer";
import watchlistReducer from "./watchlistReducer";

const rootReducer = combineReducers({
  user: userReducer,
  watchlist: watchlistReducer,
});

export default rootReducer;
