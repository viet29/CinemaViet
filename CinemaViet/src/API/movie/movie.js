import { URL } from "AppConstants";
import axios from "axios";

const config = {
    headers: {
      " Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "multipart/form-data"
    },
  };
  

export const UploadFileImage = (formData) => {
    try {
        return axios.post(URL + "/admin/movie/image" , formData , config).then((res) =>{
            if(res.status === 200){
                console.log(res.data)
                return res.data;
            }
        })
    } catch (error) {
        return "";
    }
}

export const UploadFileImageDir = (formData) => {
    try {
        return axios.post(URL + "/admin/director/image" , formData , config).then((res) =>{
            if(res.status === 200){
                console.log(res.data)
                return res.data;
            }
        })
    } catch (error) {
        return "";
    }
}

export const UploadFileImageCast = (formData) => {
    try {
        return axios.post(URL + "/admin/cast/image" , formData , config).then((res) =>{
            if(res.status === 200){
                console.log(res.data)
                return res.data;
            }
        })
    } catch (error) {
        return "";
    }
}