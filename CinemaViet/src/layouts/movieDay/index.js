import { Card } from "@mui/material";
import { getUserInfoById } from "API/authentitication/auth";
import { deleteMovieDay } from "API/movieDay/movieDay";
import { getListMovieDay } from "API/movieDay/movieDay";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PagingList from "layouts/utils/Pagination";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { IDataToken } from "layouts/Init/initForm";
import { listRoom } from "API/room/room";
import { listMovies } from "API/movies/movie";
import { IFormSearchMovieDay } from "layouts/Init/initForm";
import { HandleSearchItemMovieDay } from "layouts/utils/HandleFilter";

export default function TableMovieDay() {
  const [lstMovieDay, setLstMovieDay] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageFocus, setPageFocus] = useState(0);
  const [author, setAuthor] = useState(IDataToken);
  const [lstRoom, setLstRoom] = useState([]);
  const [lstMovie, setLstMovie] = useState([]);
  const [formSearch, setFormSearch] = useState(IFormSearchMovieDay);
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getListMovieDay();
    const lstRoom = await listRoom();
    const lstMovie = await listMovies();
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    var decoded = jwt_decode(token);
    console.log(data);

    setLstRoom(lstRoom);
    setLstMovie(lstMovie);
    setAuthor(decoded);
    if (data) {
      setLstMovieDay(data);
    }
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(dataFilter.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataFilter.length / itemsPerPage));
  }, [dataFilter]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(lstMovieDay.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(lstMovieDay.length / itemsPerPage));
  }, [lstMovieDay]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    if (formSearch.movieId === 0 && formSearch.showDate === "" && formSearch.roomId === 0) {
      setPaginatedItems(lstMovieDay.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(lstMovieDay.length / itemsPerPage));
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
    let newOffset = (event.selected * itemsPerPage) % lstMovieDay.length;

    setItemOffset(newOffset);
    setPageFocus(event.selected);
  };

  const handleDelete = (id) => {
    deleteMovieDay(id);
  };

  const HandleSearch = (formData) => {
    console.log(formData);
    const lstFilter = lstMovieDay.filter((x) => HandleSearchItemMovieDay(x, formData));

    setDataFilter(lstFilter);
  };

  const handlerReset = () => {
    setFormSearch(IFormSearchMovieDay);
    HandleSearch(IFormSearchMovieDay);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftTypography variant="h6" mt={3} ml={3}>
              Movie Day Table
            </SoftTypography>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <div className="flex">
                <label className="text-lg mt-1">
                  <small>Movie : </small>
                </label>
                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400  w-72 p-2 ml-2 "
                  value={formSearch.movieId}
                  onChange={(e) => setFormSearch({ ...formSearch, movieId: e.target.value })}
                >
                  <option value={0}> Select Movie</option>
                  {lstMovie &&
                    lstMovie.map((movie, index) => (
                      <option value={movie.id} key={index}>
                        {movie.titile}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="text-lg mt-1">
                  <small>Room : </small>
                </label>
                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 w-72 p-2 ml-2 "
                  value={formSearch.roomId}
                  onChange={(e) => setFormSearch({ ...formSearch, roomId: e.target.value })}
                >
                  <option value={0}>Select room</option>
                  {lstRoom &&
                    lstRoom.map((room, index) => (
                      <option value={room.roomId} key={index}>
                        {room.roomName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex">
                <label className="text-lg mt-1">
                  <small>Show Date : </small>
                </label>
                <input
                  type="date"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-72 p-2 ml-2 "
                  value={formSearch.showDate}
                  onChange={(e) => setFormSearch({ ...formSearch, showDate: e.target.value })}
                />
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
                {(author.roles[0] === "Role_Admin" || author.roles[0] === "Role_Super_Admin") && (
                  <Link to={"/movie_day/create"}>
                    <SoftButton variant="gradient" color="info">
                      Create New
                    </SoftButton>
                  </Link>
                )}
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
              <div className="relative  shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Movie Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Show Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Show Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Room
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.length > 0 &&
                      paginatedItems.map((movieDay) => (
                        <tr key={movieDay.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">{movieDay.movieRes.titile}</td>
                          <td className="px-6 py-4">{movieDay.showDate}</td>
                          <td className="px-6 py-4">{movieDay.showTime}</td>
                          <td className="px-6 py-4">{movieDay.roomName}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {(author.roles[0] === "Role_Admin" ||
                                author.roles[0] === "Role_Super_Admin") && (
                                <div
                                  data-te-chip-init
                                  data-te-ripple-init
                                  className={`${"bg-rose-600 [word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] text-white"}`}
                                  data-te-close="true"
                                >
                                  <button onClick={() => handleDelete(movieDay.id)}>DELETE</button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {lstMovieDay.length > 0 && (
                  <PagingList
                    handleChangeItemsPerPage={handleChangeItemsPerPage}
                    handlePageChange={handlePageChange}
                    item={lstMovieDay}
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
