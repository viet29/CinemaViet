import axios from "axios";
import { URL } from "AppConstants";

const config = {
  headers: {
    " Authorization": "Bearer " + localStorage.getItem("token"),
  },
};

const listRoom = () => {
  try {
    return axios.get(URL + `/staff/room`, config).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const saveRoom = (data) => {
  try {
    return axios.post(URL + "/admin/room/save", data, config).then((res) => {
      if (res.status === 200) {
        window.location.href = "/room";
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getRoomById = (id) => {
  try {
    return axios.get(URL + "/admin/room/" + id, config).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRoomById = (id) => {
  try {
    return axios.get(URL + "/admin/room/delete/" + id, config).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        window.location.href = "/room";
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export { listRoom, saveRoom, getRoomById, deleteRoomById };
