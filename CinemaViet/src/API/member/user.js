import axios from "axios";
import { URL } from "AppConstants";

const config = {
  headers: {
    " Authorization": "Bearer " + localStorage.getItem("token"),
  },
};

const listUser = () => {
  try {
    return axios.get(URL + `/staff/users`, config).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (data) => {
  try {
    return await axios.post(URL + `/register`, data).then((res) => {
      window.location.href = "/member";
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const userInfo = (userId) => {
  try {
    return axios.get(URL + `/admin/user/` + userId, config).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (data) => {
  try {
    return await axios.post(URL + `/admin/user/update`, data, config).then((res) => {
      window.location.href = "/member";
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const approveRoleUserToAdmin = async (id) => {
  try {
    return await axios.get(URL + `/super_admin/up_role_admin/`+id , config).then((res) => {
      window.location.href = "/member";
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const approveRoleUserToStaff = async (id) => {
  try {
    return await axios.get(URL + `/super_admin/up_role_admin/`+id , config).then((res) => {
      window.location.href = "/member";
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export { listUser, createUser, editUser, userInfo ,approveRoleUserToAdmin , approveRoleUserToStaff};
