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
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        error: {},
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuth: false,
        error: {},
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
