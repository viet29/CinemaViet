import axios from "axios";
import { URL } from "AppConstants";

const config = {
  headers: {
    " Authorization": "Bearer " + localStorage.getItem("token"),
  },
};

const listCast = () => {
  try {
    return axios.get(URL + `/staff/cast`, config).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const saveCast = (data) => {
  try {
    return axios.post(URL + "/admin/cast/save", data, config).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        window.location.href = "/cast";
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkDuplicate = (data) => {
  try {
    return axios.post(URL + "/admin/cast/checkDuplicate", data, config).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getCastbyId = (id) => {
  try {
    return axios.get(URL + "/staff/cast/" + id, config).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteCastById = (id) => {
  try {
    return axios.get(URL + "/admin/cast/delete/" + id, config).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        window.location.href = "/cast";
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export { listCast, saveCast, getCastbyId, deleteCastById };
