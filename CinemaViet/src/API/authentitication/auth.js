import axios from "axios";
import { URL } from "AppConstants";

const config = {
  headers: {
    " Authorization": "Bearer " + localStorage.getItem("token"),
  },
};

const handlelogin = (data) => {
  try {
    return axios.post(URL + `/login`, data).then((res) => {
      localStorage.setItem("token", res.data.access_token);
      // console.log(res.data);
      window.location.href = "/dashboard";
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};
const handleRegister = (data) => {
  try {
    axios.post(URL + `/register`, data).then((res) => {
      window.location.href = "/authentication/sign-in";
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const handleLogout = () => {
  try {
    axios.get(URL + `/logout`, config).then((res) => {
      localStorage.removeItem("token");
      window.location.href = "/authentication/sign-in";
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfoById = (userName) => {
  try {
    return axios.get(URL + "/user/" + userName, config).then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        handleLogout();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkDuplicateRegister = (userName) => {
  try {
    return axios.get(URL + "/view/" + userName).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    });
  } catch (error) {}
};

export const getLstRole = () => {
  try {
    return axios.get(URL + "/staff/roles", config).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    });
  } catch (error) {}
};

export { handlelogin, handleRegister, handleLogout };
