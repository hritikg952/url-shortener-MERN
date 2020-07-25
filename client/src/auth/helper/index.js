import axios from "axios";
import { API } from "../../backend";
//API = "http://localhost:5000/api"

export const signin = (data) => {
  return axios
    .post(`${API}/signin`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const signup = (data) => {
  return axios
    .post(`${API}/signup`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");

    return axios
      .get(`${API}/signout`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAutheticated = () => {
  // if (typeof window == "undefined") {
  //   return false;
  // }
  if (localStorage.getItem("jwt")) {
    console.log("isAuthenticated true");
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    console.log("isAuthenticated false");
    return false;
  }
};
