import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/types";

const initialState = {
  isAuth: !!localStorage.getItem("token"),
  user: {},
  error: {},
  isLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: {},
      };
    case LOGIN_SUCCESS:
      return {
        isLoading: false,
        isAuth: true,
        error: {},
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case LOGOUT:
      return {
        isLoading: false,
        isAuth: false,
        error: {},
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
