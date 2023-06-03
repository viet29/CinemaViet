import { URL } from "AppConstants";
import axios from "axios";

const config = {
  headers: {
    " Authorization": "Bearer " + localStorage.getItem("token"),
  },
};

export const getListMovieDay = () => {
  try {
    return axios.get(URL + "/staff/movieDays", config).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    });
  } catch (error) {}
};

export const deleteMovieDay = (id) => {
  try {
    return axios.get(URL + "/admin/movieDay/delete/" + id, config).then((res) => {
      if (res.status === 200) {
        window.location.href = "/movieDay";
      }
    });
  } catch (error) {}
};

export const saveMovieDay = (data) => {
  try {
    return axios.post(URL + "/admin/movieDay/save", data, config).then((res) => {
      if (res.status === 200) {
        window.location.href = "/movieDay";
        return res.data;
      }
    });
  } catch (error) {}
};

export const checkDuplicateMovieDay = (data) => {
  try {
    return axios.post(URL + "/admin/movieDay/checkDuplicate", data, config).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    });
  } catch (error) {}
};
