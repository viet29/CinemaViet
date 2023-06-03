import axios from "axios";

import { URL } from "AppConstants";

const config = {
  headers: {
    " Authorization": "Bearer " + localStorage.getItem("token"),
  },
};

export const listMovieBooking = () => {
  try {
    return axios.get(URL + `/staff/booking_depot`, config).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const approveBooking = (id ) => {
  try {
    return axios.get(URL + `/staff/booking/approve/`+ id, config).then((res) => {
      window.location.href = "/bookings";
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
}
