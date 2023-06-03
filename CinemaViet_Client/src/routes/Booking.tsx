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

    if (seated) {
      setSeated(seated);
    }

    if (movieDay) {
      const dataMovie: IMovie = await getListMovieById(Number(movieDay.movieRes.id));

      if (dataMovie) {
        setMovieDetail(dataMovie);
      }

      setMovieDay(movieDay);
    }
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const CheckSeated = (seatName: String) => {
    const checkSeated: ISeatedBooking[] = seated.filter((x) => x.seatName === seatName);
    if (checkSeated.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
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

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const selectSeat = async (seat: String) => {
    var seatBooking: String[] = lstSeat.seats;

    const checkSeatExists: String[] = seatBooking.filter((x) => x === seat);

    if (checkSeatExists.length > 0) {
      const check = seatBooking.filter((x) => x !== seat);
      setLstSeat({ ...lstSeat, seats: check });
    } else {
      seatBooking.push(seat);
      setLstSeat({ ...lstSeat, seats: seatBooking });
    }
  };

  const handleGenerate = (row: String, rowNumber: number) => {
    const column = [];
    const background =
      rowNumber >= 69 && rowNumber <= 73
        ? "border-2 border-red-500 text-gray-900 "
        : "border text-gray-900 ";
    for (let i = 1; i <= 12; i++) {
      if (CheckSeated(row + "-" + i)) {
        column.push(
          <button disabled={true} className={`${"text-sm w-12 m-1"} ${"bg-zinc-800 text-white"}`}>
            {row + " - " + i}
          </button>
        );
      } else {
        column.push(
          <button
            onClick={async (e) => await selectSeat(row + "-" + i)}
            className={`${"text-sm w-12 m-1"} ${changeBackgroundSeat(row + "-" + i) ? "bg-red-800 text-white" : background
              }`}
          >
            {row + " - " + i}
          </button>
        );
      }
    }
    return column;
  };

  const changeBackgroundSeat = (seat: String) => {
    var seatBooking: String[] = lstSeat.seats;

    const checkSeatExists: String[] = seatBooking.filter((x) => x === seat);

    if (checkSeatExists.length > 0) {
      return true;
    }

    return false;
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
          <div className="text-gray-900 pt-6">
            <div>
              Cinema Viet Plaza | {movieDay?.roomName}| Seats ({132 - seated.length}/132)
            </div>
            <div>Movie: {movieDetail?.titile}</div>
            <div>{movieDay?.showDate + " " + movieDay?.showTime}</div>
          </div>
          <div className="pt-3">
            <Box sx={{ width: "100%" }}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <div>
                {allStepsCompleted() ? (
                  <Fragment>
                    <Typography className="text-gray-900" sx={{ mt: 2, mb: 1 }}>
                      <div className="text-gray-900">{messageAfterBooking}</div>
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Link to={"/"} className="text-sky-600">
                        Home
                      </Link>
                    </Box>
                  </Fragment>
                ) : (
                  <Fragment>
                    {activeStep == 0 ? (
                      <div>
                        <Typography
                          variant="h4"
                          className="text-gray-900 flex justify-center pl-20"
                          sx={{ mt: 2, mb: 1, py: 1 }}
                        >
                          People/Seat
                        </Typography>
                        <div className="flex justify-center pb-5 pl-20">
                          <p className="bg-gray-500 w-96 h-2 rounded-t-3xl"></p>
                        </div>
                        <div>{rows}</div>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                          <Box sx={{ flex: "1 1 auto" }} />

                          {activeStep !== steps.length &&
                            (completed[activeStep] ? (
                              <Typography
                                className="text-gray-900"
                                variant="caption"
                                sx={{ display: "inline-block" }}
                              >
                                Step {activeStep + 1} already completed
                              </Typography>
                            ) : (
                              <Button
                                onClick={handleComplete}
                                disabled={lstSeat.seats.length > 0 ? false : true}
                              >
                                <span
                                  className={`${lstSeat.seats.length > 0 ? "bg-sky-600 " : "bg-gray-500"
                                    } ${"border-radius-booking w-36 text-white"} `}
                                >
                                  {completedSteps() === totalSteps() - 1
                                    ? "Finish"
                                    : "Complete Step"}
                                </span>
                              </Button>
                            ))}
                        </Box>
                      </div>
                    ) : activeStep == 1 ? (
                      <div>
                        <Typography
                          variant="h4"
                          className="text-gray-900 flex justify-center"
                          sx={{ mt: 2, mb: 1, py: 1 }}
                        >
                          Payment
                        </Typography>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="ticketContainer">
                            <div className="ticket border w-full">
                              <div className="ticketTitle">CinemaViet Plaza</div>
                              <hr className="w-full" />
                              <div className="ticketDetail">
                                <div>Movie:&ensp; {movieDetail?.titile}</div>
                                <div>User:&ensp; {userInfo?.fullName}</div>
                                <div>Studio:&nbsp; {movieDay?.roomName}</div>
                                <div>Time:&emsp; {movieDay?.showTime}</div>
                                <div>
                                  Seat:&emsp;
                                  {lstSeat.seats &&
                                    lstSeat.seats.map((item: String) => (
                                      <span className="[word-wrap: break-word] my-[5px] mr-4 h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-green-500 py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-white shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] ">
                                        {item}
                                      </span>
                                    ))}
                                </div>
                              </div>
                              <div className="ticketRip">
                                <div className="circleLeft"></div>
                                <div className="ripLine"></div>
                                <div className="circleRight"></div>
                              </div>
                              <div className="ticketSubDetail">
                                <div className="code">Total</div>
                                <div className="date">{lstSeat.seats.length * 5}$</div>
                              </div>
                            </div>
                          </div>
                          <div className="px-5">
                            <div className="pb-7">
                              <h4 className=" text-xl text-gray-900">Pay at the counter</h4>
                            </div>

                            <div className="flex items-center mb-4">
                              <input
                                id="default-radio-1"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                              />
                              <label
                                htmlFor="default-radio-1"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                ATM card (Vietnam Domestic)
                              </label>
                            </div>
                            <div className="flex items-center mb-4">
                              <input
                                checked
                                id="default-radio-2"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                              />
                              <label
                                htmlFor="default-radio-2"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Credit Card (Visa, Master, American Express, JCB)
                              </label>
                            </div>
                            <div className="flex items-center mb-4">
                              <input
                                checked
                                id="default-radio-2"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                              />
                              <label
                                htmlFor="default-radio-2"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                ZaloPay
                              </label>
                            </div>
                            <div className="flex items-center mb-4">
                              <input
                                checked
                                id="default-radio-2"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                              />
                              <label
                                htmlFor="default-radio-2"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Momo
                              </label>
                            </div>
                          </div>
                        </div>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                          <Box sx={{ flex: "1 1 auto" }} />
                          <Button onClick={handleBack} sx={{ mr: 1 }}>
                            <span className="bg-gray-600 border-radius-booking w-36 text-white">
                              Back
                            </span>
                          </Button>
                          {activeStep !== steps.length &&
                            (completed[activeStep] ? (
                              <Typography
                                className="text-gray-900"
                                variant="caption"
                                sx={{ display: "inline-block" }}
                              >
                                Step {activeStep + 1} already completed
                              </Typography>
                            ) : (
                              <Button
                                onClick={handleOrder}
                                disabled={lstSeat.seats.length > 0 ? false : true}
                              >
                                <span
                                  className={`${lstSeat.seats.length > 0 ? "bg-sky-600 " : "bg-gray-500"
                                    } ${"border-radius-booking w-36 text-white"} `}
                                >
                                  {completedSteps() === totalSteps() - 1
                                    ? "Finish"
                                    : "Complete Step"}
                                </span>
                              </Button>
                            ))}
                        </Box>
                      </div>
                    ) : activeStep == 2 ? (
                      <div>
                        <Typography
                          variant="h4"
                          className="text-gray-900 flex justify-center"
                          sx={{ mt: 2, mb: 1, py: 1 }}
                        >
                          Notification
                        </Typography>
                        <div className="text-gray-900">{messageAfterBooking}</div>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                          <Box sx={{ flex: "1 1 auto" }} />
                          {activeStep !== steps.length &&
                            (completed[activeStep] ? (
                              <Typography
                                className="text-gray-900"
                                variant="caption"
                                sx={{ display: "inline-block" }}
                              >
                                Step {activeStep + 1} already completed
                              </Typography>
                            ) : (
                              <div>
                                <Link to={"/"}>
                                  <Button onClick={handleComplete}>
                                    <span className="bg-sky-600 border-radius-booking w-36 text-white">
                                      {completedSteps() === totalSteps() - 1
                                        ? "Finish"
                                        : "Complete Step"}
                                    </span>
                                  </Button>
                                </Link>
                              </div>
                            ))}
                        </Box>
                      </div>
                    ) : null}
                  </Fragment>
                )}
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
