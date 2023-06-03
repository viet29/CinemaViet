import axios from "axios";
import { URL } from "AppConstants";

const config = {
  headers: {
    " Authorization": "Bearer " + localStorage.getItem("token"),
  },
};

const listDirector = () => {
  try {
    return axios.get(URL + `/staff/directors`, config).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const saveDirector = (data) => {
  try {
    return axios.post(URL + "/admin/director/save", data, config).then((res) => {
      if (res.status === 200) {
        window.location.href = "/director";
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkDuplicateDir = (data) => {
  try {
    return axios.post(URL + "/admin/dir/checkDuplicate", data, config).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};


const getDirectorbyId = (id) => {
  try {
    return axios.get(URL + "/staff/director/" + id, config).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteDirectorById = (id) => {
  try {
    return axios.get(URL + "/admin/director/delete/" + id, config).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        window.location.href = "/director";
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export { listDirector, saveDirector, getDirectorbyId, deleteDirectorById };
