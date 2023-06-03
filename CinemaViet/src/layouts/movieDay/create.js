import { Card, FormHelperText } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { listMovies } from "API/movies/movie";
import SoftButton from "components/SoftButton";
import Footer from "examples/Footer";
import { saveMovieDay } from "API/movieDay/movieDay";
import { listRoom } from "API/room/room";
import { checkDuplicateMovieDay } from "API/movieDay/movieDay";
export default function CreateMovieDay() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const movieData = await listMovies();
    const roomData = await listRoom();
    if (roomData) {
      setRooms(roomData);
    }
    if (movieData) {
      setMovies(movieData);
    }
  };

  const onSubmitNewUser = async (data) => {
    const checkExist = await checkDuplicateMovieDay(data);
    if (!checkExist) {
      saveMovieDay(data);
    } else {
      setMessage(checkExist);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox onSubmit={handleSubmit(onSubmitNewUser)} component="form" role="form" p={2}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Movie
                      </SoftTypography>
                    </SoftBox>
                    <select
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                      {...register("movieId", { required: true })}
                    >
                      <option value="">Select...</option>
                      {movies.length > 0 &&
                        movies.map((movie) => (
                          <option key={movie.id} value={movie.id}>
                            {movie.titile}
                          </option>
                        ))}
                    </select>
                    {errors.movieId && (
                      <FormHelperText error id="component-error-text">
                        Movie is required
                      </FormHelperText>
                    )}
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Room
                      </SoftTypography>
                    </SoftBox>
                    <select
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                      {...register("roomId", { required: true })}
                    >
                      <option value="">Select...</option>
                      {rooms.length > 0 &&
                        rooms.map((room) => (
                          <option key={room.roomId} value={room.roomId}>
                            {room.roomName}
                          </option>
                        ))}
                    </select>
                    {errors.roomId && (
                      <FormHelperText error id="component-error-text">
                        Room is required
                      </FormHelperText>
                    )}
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Show Time
                      </SoftTypography>
                    </SoftBox>
                    <select
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                      {...register("ShowTime", { required: true })}
                    >
                      <option value="9:30">9:30</option>
                      <option value="11:00">11:00</option>
                      <option value="12:30">12:30</option>
                      <option value="14:35">14:35</option>
                      <option value="15:20">15:20</option>
                      <option value="17:30">17:30</option>
                      <option value="19:10">19:10</option>
                      <option value="20:00">20:00</option>
                      <option value="21:00">21:00</option>
                    </select>
                    {errors.ShowTime && (
                      <FormHelperText error id="component-error-text">
                        ShowTime is required
                      </FormHelperText>
                    )}
                    {message && (
                      <FormHelperText error id="component-error-text">
                       Show Time is exist in show Date
                      </FormHelperText>
                    )}
                  </SoftBox>
                </div>

                <div>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Show Date
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="date"
                      id="showDate"
                      {...register("showDate", { required: true })}
                    />
                    {errors.showDate && (
                      <FormHelperText error id="component-error-text">
                        Show Date is required
                      </FormHelperText>
                    )}
                  </SoftBox>
                </div>
              </div>
              <SoftBox mt={4} mb={1}>
                <SoftButton type="submit" variant="gradient" color="info">
                  Create
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}
