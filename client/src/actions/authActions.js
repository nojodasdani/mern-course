import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //set token to Authorization header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//log user out
export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //set the current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
