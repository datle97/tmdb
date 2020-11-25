import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGOUT } from "./types";
import { authHeader } from "./watchlistActions";

export const signUp = (newUser) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post(
      "https://agile-savannah-25594.herokuapp.com/user/signup",
      newUser
    );
    // đăng nhập sau khi đăng ký thành công
    localStorage.setItem("token", JSON.stringify(data.token));
    dispatch(loginSuccess(data.user));
  } catch (err) {
    dispatch(loginFailure({ signup: err.response.data }));
  }
};

export const login = (user) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post(
      "https://agile-savannah-25594.herokuapp.com/user/login",
      user
    );
    localStorage.setItem("token", JSON.stringify(data.token));
    dispatch(loginSuccess(data.user));
  } catch (err) {
    dispatch(loginFailure({ login: err.response.data }));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logoutUser());
};

// đăng nhập sau khi người dùng quay lại hoặc refresh trang
// useEffect App.js
export const fetchProfile = () => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.get(
      "https://agile-savannah-25594.herokuapp.com/user/profile",
      {
        headers: authHeader(),
      }
    );
    dispatch(loginSuccess(data.user));
  } catch (err) {
    dispatch(logout());
  }
};

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

const logoutUser = () => ({
  type: LOGOUT,
});
