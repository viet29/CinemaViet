import axios from "axios";
import { URL } from "../../AppContains";
import { IBookingMovie } from "../../Util/FormInit";

const config = {
    headers: {
      " Authorization": "Bearer " + localStorage.getItem("token"),
    },
  };

export const getListMovie = () => {
    return axios.get(URL + "/view/movies").then((res) => {
        if(res.status === 200){
            return res.data;
        }
    })
}

export const getListMovieById = (id: number) => {
    return axios.get(URL + "/view/movie/"+ id).then((res) => {
        if(res.status === 200){
            return res.data;
        }
    })
}

export const getListMovieDayByMovieId =  (id: number) => {
    return axios.get(URL + "/view/movie/show_calendar/"+ id).then((res) => {
        if(res.status === 200){
            return res.data;
        }
    })
}

export const getMovieDayById = (id: number) => {
    return axios.get(URL + "/view/movie_day/show_calendar/"+ id).then((res) => {
        if(res.status === 200){
            return res.data;
        }
    })
}

export const saveBookingOrder = (data : IBookingMovie) => {
    return axios.post(URL + "/user/save/booking" , data,config).then((res) => {
        if(res.status === 200){
            return true;
        }else{
            return false;
        }
    })
}

export const getSeatedBookingById = (id: number) => {
    return axios.get(URL + "/view/booking/seated/"+ id).then((res) => {
        if(res.status === 200){
            return res.data;
        }
    })
}

export const getBookingByUserId = (id: String) => {
    return axios.get(URL + "/user/booking_depot/"+ id , config).then((res) => {
        if(res.status === 200){
            return res.data;
        }
    })
}