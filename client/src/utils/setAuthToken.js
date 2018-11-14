import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //Apply to every request
    axios.defaults.headers.commmon["Authorization"] = token;
  } else {
    //Delete auth header
    delete axios.defaults.headers.commmon["Authorization"];
  }
};

export default setAuthToken;
