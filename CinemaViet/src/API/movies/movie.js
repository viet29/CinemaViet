import axios from "axios";
import { URL } from "AppConstants";

const config = {
  headers: {
    " Authorization": "Bearer " + localStorage.getItem("token"),
  },
};

const listMovies = () => {
  try {
    return axios.get(URL + `/staff/movies`, config).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const saveMovies = (data) => {
  try {
    return axios.post(URL + "/admin/movie/save", data, config).then((res) => {
      if (res.status === 200) {
        window.location.href = "/movies";
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getMoviesById = (id) => {
  try {
    return axios.get(URL + "/staff/movie/" + id, config).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteMoviesById = (id) => {
  try {
    return axios.get(URL + "/admin/movie/delete/" + id, config).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        window.location.href = "/movies";
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export { listMovies, saveMovies, getMoviesById, deleteMoviesById };
