import { Helmet } from "react-helmet";
import conf from "../Config";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { Fragment, useState } from "react";
import { StepButton } from "@mui/material";
import {
    IBookingMovie,
    IClient,
    IMovie,
    IMovieDayDetail,
    ISeatedBooking,
    ITokenObject,
} from "../Util/FormInit";
import { Link, useParams } from "react-router-dom";
import {
    getListMovieById,
    getMovieDayById,
    getSeatedBookingById,
    saveBookingOrder,
} from "../API/movies/moviesUtil";

import jwt_decode from "jwt-decode";
import MovieDay from "./MovieDay";
import { getUserInfoById, handleLogout } from "../API/authentication/authUtil";

const steps = ["People/Seats", "Payment", "Notification"];

export default function Booking() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});
    const { movieId } = useParams();

    const [lstSeat, setLstSeat] = useState<any>({ seats: [] });
    const [movieDetail, setMovieDetail] = useState<IMovie>();
    const [movieDay, setMovieDay] = useState<IMovieDayDetail>();
    const [messageAfterBooking, setMessageAfterBooking] = useState<String>("");
    const [seated, setSeated] = useState<ISeatedBooking[]>([]);
    const [userInfo, setUserInfo] = useState<IClient>();

    const rows = [];

    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        setActiveStep(0);
    }, [lstSeat]);

    const fetchData = async () => {
        const movieDay: IMovieDayDetail = await getMovieDayById(Number(movieId));
        const seated: ISeatedBooking[] = await getSeatedBookingById(Number(movieId));
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
        if (token) {
            var decoded: ITokenObject = jwt_decode(token);
            const user: IClient = await getUserInfoById(decoded.sub);

            if (user) {
                setUserInfo(user);
            } else {
                await handleLogout();
            }
        }

    };






    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleOrder = async () => {
        let today = new Date();
        let date = today.getFullYear() + "-" + Number(today.getMonth() + 1) + "-" + today.getDate();

        const dataBooking: IBookingMovie = {
            lstSeat: lstSeat.seats,
            movieId: movieDetail?.id != undefined ? movieDetail?.id : 1,
            movieDayId: movieDay?.id != undefined ? movieDay?.id : 1,
            roomId: movieDay?.roomId != undefined ? movieDay?.roomId : 1,
            seatId: 1,
            orderDate: String(date),
            discount: 1,
            status: 1,
            userId: userInfo?.userId != undefined ? userInfo?.userId : "",
        };

        if (userInfo) {
            const result = await saveBookingOrder(dataBooking);

            if (result) {
                setMessageAfterBooking("Thank you for using the service");
            } else {
                setMessageAfterBooking("Can't book tickets at the moment, please try again later");
            }

            handleComplete();
        }
    };




    for (let i = 65; i <= 75; i++) {
        rows.push(
            <div className="container mx-auto">
                <div className="grid grid-cols-4">
                    <p className="text-gray-900 flex justify-center">{String.fromCharCode(i)}</p>
                    <div className="col-span-3">{handleGenerate(String.fromCharCode(i), i)}</div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Booking - {conf.SITE_NAME}</title>
            </Helmet>
            <div className="bg-white">
                <div className="container mx-auto">

                </div>
            </div>
        </>
    );
}
