import axios from "axios";
import { URL } from "AppConstants";

const config = {
  headers: {
    " Authorization": "Bearer " + localStorage.getItem("token"),
  },
};

const listSeat = () => {
  try {
    return axios.get(URL + `/admin/seats`, config).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const saveSeat = (data) => {
  try {
    return axios.post(URL + "/admin/seat/save", data, config).then((res) => {
      if (res.status === 200) {
        window.location.href = "/seat";
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getSeatById = (id) => {
  try {
    return axios.get(URL + "/admin/seat/" + id, config).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteSeatById = (id) => {
  try {
    return axios.get(URL + "/admin/seat/delete/" + id, config).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        window.location.href = "/seat";
        return res.data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export { listSeat, saveSeat, getSeatById, deleteSeatById };
