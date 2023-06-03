// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import SoftButton from "components/SoftButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { listMovies } from "API/movies/movie";
import PagingList from "layouts/utils/Pagination";
import { listDirector } from "API/director/director";
import { listUser } from "API/member/user";
import { IFormSearchMovie } from "layouts/Init/initForm";
import { HandleSearchItemMovie } from "layouts/utils/HandleFilter";
import { IDataToken } from "layouts/Init/initForm";
import jwt_decode from "jwt-decode";

function Tables() {
  const [listMovie, setListMovie] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageFocus, setPageFocus] = useState(0);
  const [lstDir, setLstDir] = useState([]);
  const [lstCreateBy, setLstCreateBy] = useState([]);
  const [formDataSearch, setFormDataSearch] = useState(IFormSearchMovie);
  const [dataFilter, setDataFilter] = useState([]);
  const [author, setAuthor] = useState(IDataToken);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const list = await listMovies();
    const directors = await listDirector();
    const createByUsers = await listUser();
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    var decoded = jwt_decode(token);

    if (decoded) {
      setAuthor(decoded);
    }

    setLstDir(directors);
    setLstCreateBy(createByUsers);
    setListMovie(list);
  };

  const handleOnChangeValueFilter = (event, field) => {
    const fields = { ...formDataSearch };

    fields[field] = event.target.value;

    setFormDataSearch(fields);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(dataFilter.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataFilter.length / itemsPerPage));
  }, [dataFilter]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(listMovie.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listMovie.length / itemsPerPage));
  }, [listMovie]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    if (
      formDataSearch.title === "" &&
      formDataSearch.releaseDate === "" &&
      formDataSearch.userId === "" &&
      formDataSearch.directorId === 0
    ) {
      setPaginatedItems(listMovie.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(listMovie.length / itemsPerPage));
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
    let newOffset = (event.selected * itemsPerPage) % listMovie.length;

    setItemOffset(newOffset);
    setPageFocus(event.selected);
  };

  const HandleSearch = (formData) => {
    const lstFilter = listMovie.filter((x) => HandleSearchItemMovie(x, formData));

    setDataFilter(lstFilter);
  };

  const handlerReset = () => {
    setFormDataSearch(IFormSearchMovie);
    HandleSearch(IFormSearchMovie);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftTypography variant="h6" mt={3} ml={3}>
              Movies Table
            </SoftTypography>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <div className="flex">
                <label className="mr-1 text-lg mt-1">
                  <small>Title: </small>
                </label>
                <input
                  type="text"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-56 p-2 "
                  placeholder="Title"
                  value={formDataSearch.title}
                  onChange={(e) => handleOnChangeValueFilter(e, "title")}
                />
              </div>
              <div>
                <label className="mr-1 text-lg mt-1">
                  <small>Director: </small>
                </label>
                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400  w-56 p-2 "
                  value={formDataSearch.directorId}
                  onChange={(e) => handleOnChangeValueFilter(e, "directorId")}
                >
                  <option value={0}> Select Director</option>
                  {lstDir.length > 0 &&
                    lstDir.map((item, index) => (
                      <option key={index} value={item.directorId}>
                        {item.directorName}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="mr-1 text-lg mt-1">
                  <small>Release Date: </small>
                </label>
                <input
                  type="date"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400  w-56 p-2 "
                  value={formDataSearch.releaseDate}
                  onChange={(e) => handleOnChangeValueFilter(e, "releaseDate")}
                />
              </div>

              <div>
                <label className="mr-1 text-lg mt-1">
                  <small>Create By: </small>
                </label>
                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400  w-56 p-2 "
                  value={formDataSearch.userId}
                  onChange={(e) => handleOnChangeValueFilter(e, "userId")}
                >
                  <option value={""}>Select Create By</option>
                  {lstCreateBy.length > 0 &&
                    lstCreateBy.map((item, index) => {
                      if (item.roles[0].roleId !== 2) {
                        return (
                          <option key={index} value={item.userId}>
                            {item.userName}
                          </option>
                        );
                      }
                    })}
                </select>
              </div>

              <div>
                <button
                  className="bg-sky-800 text-white rounded-lg text-sm w-20 h-10 focus:ring-blue-400 focus:border-blue-400 mr-2"
                  onClick={() => HandleSearch(formDataSearch)}
                >
                  Search
                </button>
                <button
                  className="bg-gray-400 text-white rounded-lg text-sm w-20 h-10 focus:ring-blue-400 focus:border-blue-400 mr-2"
                  onClick={handlerReset}
                >
                  Reset
                </button>
                {(author?.roles[0] === "Role_Admin" || author?.roles[0] === "Role_Super_Admin") && (
                  <Link to={"/movies/create"}>
                    <SoftButton variant="gradient" color="info" className="h-10">
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
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Director
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Release Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Rated
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Create By
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.length > 0 &&
                      paginatedItems.map((m) => (
                        <tr key={m.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">{m.titile}</td>
                          <td className="px-6 py-4">{m.directorName}</td>
                          <td className="px-6 py-4">{m.releaseDate}</td>
                          <td className="px-6 py-4">{m.rated}</td>
                          <td className="px-6 py-4">{m.createByName}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {(author?.roles[0] === "Role_Admin" ||
                                author?.roles[0] === "Role_Super_Admin") && (
                                <div
                                  data-te-chip-init
                                  data-te-ripple-init
                                  className={`${"bg-amber-300  [word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] text-white"}`}
                                  data-te-close="true"
                                >
                                  <Link className="uppercase" to={"/movies/edit/" + m.id}>
                                    update
                                  </Link>
                                </div>
                              )}

                              <div
                                data-te-chip-init
                                data-te-ripple-init
                                className={`${"bg-teal-300  [word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] text-white"}`}
                                data-te-close="true"
                              >
                                <Link className="uppercase" to={"/movies/detail/" + m.id}>
                                  detail
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {listMovie.length > 0 && (
                  <PagingList
                    handleChangeItemsPerPage={handleChangeItemsPerPage}
                    handlePageChange={handlePageChange}
                    item={listMovie}
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

export default Tables;
