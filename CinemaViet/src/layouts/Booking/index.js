import { Card } from "@mui/material";
import { approveBooking } from "API/booking/bookings";
import { listMovieBooking } from "API/booking/bookings";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import PagingList from "layouts/utils/Pagination";
import { getUserInfoById } from "API/authentitication/auth";
import { MEMBER } from "AppConstants";
import { listRoom } from "API/room/room";
import { listMovies } from "API/movies/movie";
import { IFormSearchBooking } from "layouts/Init/initForm";
import { HandleSearchItemBooking } from "layouts/utils/HandleFilter";

export default function TableBookingDepot() {
  const [bookings, setBookings] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageFocus, setPageFocus] = useState(0);
  const [author, setAuthor] = useState({});
  const [lstRoom, setLstRoom] = useState([]);
  const [lstMovie, setLstMovie] = useState([]);
  const [formSearch, setFormSearch] = useState(IFormSearchBooking);
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const bookingData = await listMovieBooking();
    const lstRoom = await listRoom();
    const lstMovie = await listMovies();
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    var decoded = jwt_decode(token);

    if (decoded) {
      const user = await getUserInfoById(decoded.sub);
      setAuthor(user);
    }
    if (bookingData) {
      console.log(bookingData);

      setBookings(bookingData);
    }
    setLstRoom(lstRoom);
    setLstMovie(lstMovie);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(dataFilter.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataFilter.length / itemsPerPage));
  }, [dataFilter]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(bookings.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(bookings.length / itemsPerPage));
  }, [bookings]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    if (
      formSearch.movieId === 0 &&
      formSearch.showDate === "" &&
      formSearch.roomId === 0 &&
      formSearch.status === 0 &&
      formSearch.name === "" &&
      formSearch.email === ""
    ) {
      setPaginatedItems(bookings.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(bookings.length / itemsPerPage));

      return;
    }

    setPaginatedItems(dataFilter.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataFilter.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, pageFocus]);

  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setItemOffset(0);
    setPageFocus(0);
  };

  const handlePageChange = (event) => {
    let newOffset = (event.selected * itemsPerPage) % bookings.length;

    setItemOffset(newOffset);
    setPageFocus(event.selected);
  };

  const approveBookingDepot = (id) => {
    approveBooking(id);
  };

  const checkExpiredDateTicket = (dateBooking) => {
    const dateNow = new Date();
    const dateOrder = new Date(Date.parse(dateBooking));

    if (dateOrder > dateNow) {
      return true;
    }

    return false;
  };
  const HandleSearch = (formData) => {
    console.log(formData);
    const lstFilter = bookings.filter((x) => HandleSearchItemBooking(x, formData));

    setDataFilter(lstFilter);
  };

  const handlerReset = () => {
    setFormSearch(IFormSearchBooking);
    HandleSearch(IFormSearchBooking);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftTypography variant="h6" mt={3} ml={3}>
              Booking Table
            </SoftTypography>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <div className="flex">
                <label className="mr-1 text-lg mt-1">
                  <small>Full Name: </small>
                </label>
                <input
                  type="text"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-42 p-2 "
                  placeholder="Full Name"
                  value={formSearch.name}
                  onChange={(e) => setFormSearch({ ...formSearch, name: e.target.value })}
                />
              </div>

              <div className="flex">
                <label className="mr-1 text-lg mt-1">
                  <small>Email: </small>
                </label>
                <input
                  type="text"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-42 p-2 "
                  placeholder="Email"
                  value={formSearch.email}
                  onChange={(e) => setFormSearch({ ...formSearch, email: e.target.value })}
                />
              </div>
              <div>
                <label className="mr-1 text-lg mt-1">
                  <small>Movie: </small>
                </label>
                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400  w-36 p-2 "
                  value={formSearch.movieId}
                  onChange={(e) => setFormSearch({ ...formSearch, movieId: e.target.value })}
                >
                  <option value={0}>Select Movie</option>
                  {lstMovie &&
                    lstMovie.map((movie, index) => (
                      <option value={movie.id} key={index}>
                        {movie.titile}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="mr-1 text-lg mt-1">
                  <small>Room: </small>
                </label>
                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400  w-36 p-2 "
                  value={formSearch.roomId}
                  onChange={(e) => setFormSearch({ ...formSearch, roomId: e.target.value })}
                >
                  <option value={0}> Select Room</option>
                  {lstRoom &&
                    lstRoom.map((room, index) => (
                      <option value={room.roomId} key={index}>
                        {room.roomName}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="mr-1 text-lg mt-1">
                  <small>Show Date: </small>
                </label>
                <input
                  type="date"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400  w-36 p-2 "
                  value={formSearch.showDate}
                  onChange={(e) => setFormSearch({ ...formSearch, showDate: e.target.value })}
                />
              </div>

              <div>
                <label className="mr-1 text-lg mt-1">
                  <small>Status: </small>
                </label>
                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400  w-36 p-2 "
                  value={formSearch.status}
                  onChange={(e) => setFormSearch({ ...formSearch, status: Number(e.target.value) })}
                >
                  <option value={0}>Select status</option>
                  <option value={1}>In Progress</option>
                  <option value={2}>Approve</option>
                  <option value={3}>Expired</option>
                </select>
              </div>

              <div>
                <button
                  className="bg-sky-800 text-white rounded-lg text-sm w-20 h-10 focus:ring-blue-400 focus:border-blue-400 mr-2"
                  onClick={() => HandleSearch(formSearch)}
                >
                  Search
                </button>
                <button
                  className="bg-gray-400 text-white rounded-lg text-sm w-20 h-10 focus:ring-blue-400 focus:border-blue-400 mr-2"
                  onClick={handlerReset}
                >
                  Reset
                </button>
              </div>
            </SoftBox>

            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Order By
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Movie Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Room
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Seat Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Order Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Show Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Show Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.length > 0 &&
                      paginatedItems.map((c) => (
                        <tr key={c.bookingId} className="bg-white border-b hover:bg-gray-50">
                          <th
                            scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                          >
                            <div className="pl-3">
                              <div className="text-base font-semibold">{c.userFullName}</div>
                              <div className="font-normal text-gray-500">{c.email}</div>
                            </div>
                          </th>
                          <td className="px-6 py-4">{c.movieName}</td>
                          <td className="px-6 py-4">{c.roomName}</td>
                          <td className="px-6 py-4">{c.seatName}</td>
                          <td className="px-6 py-4">{c.orderDate}</td>
                          <td className="px-6 py-4">{c.showDate}</td>
                          <td className="px-6 py-4">{c.showTime}</td>
                          <td className="px-6 py-4">
                            {c.status === 1 ? (
                              <div>
                                {checkExpiredDateTicket(c.showDate + " " + c.showTime + ":00") ? (
                                  <span className="text-green-500"> In Process</span>
                                ) : (
                                  <span className="text-red-500">Expired</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-red-300">Approve</span>
                            )}
                          </td>
                          {c.status !== 2 &&
                            author.roles[0].roleId !== MEMBER &&
                            checkExpiredDateTicket(c.showDate + " " + c.showTime + ":00") && (
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div
                                    data-te-chip-init
                                    data-te-ripple-init
                                    className={`${"bg-red-500  [word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] text-white"}`}
                                    data-te-close="true"
                                  >
                                    <button
                                      type="button"
                                      onClick={() => approveBookingDepot(c.bookingId)}
                                      className="font-medium text-white uppercase"
                                    >
                                      Approve
                                    </button>
                                  </div>
                                </div>
                              </td>
                            )}
                        </tr>
                      ))}
                  </tbody>
                </table>
                {bookings.length > 0 && (
                  <PagingList
                    handleChangeItemsPerPage={handleChangeItemsPerPage}
                    handlePageChange={handlePageChange}
                    item={bookings}
                    pageCount={pageCount}
                    pageFocus={pageFocus}
                  />
                )}
              </div>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}
