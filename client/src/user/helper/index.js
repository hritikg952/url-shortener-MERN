import axios from "axios";
import { API } from "../../backend";
import { isAutheticated } from "../../auth/helper/index";

axios.interceptors.request.use(function (config) {
  const { token } = isAutheticated();
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export const getUrlsByUserId = (id) => {
  return axios
    .get(`${API}/url/all/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const createUrl = (id, data) => {
  return axios
    .post(`${API}/url/create/${id}`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteUrl = (userId, urlId) => {
  return axios
    .delete(`${API}/url/delete/${urlId}/${userId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
