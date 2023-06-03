// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { listUser } from "API/member/user";
import { MEMBER } from "AppConstants";
import { ADMIN } from "AppConstants";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import PagingList from "layouts/utils/Pagination";
import { getLstRole } from "API/authentitication/auth";
import { IFormSearchMember } from "layouts/Init/initForm";
import { HandleSearchItemMember } from "layouts/utils/HandleFilter";
import { SUPER_ADMIN } from "AppConstants";
import { STAFF } from "AppConstants";
import { IDataToken } from "layouts/Init/initForm";
import { approveRoleUserToAdmin } from "API/member/user";
import { approveRoleUserToStaff } from "API/member/user";

function TablesUser() {
  const [listMember, setListMember] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageFocus, setPageFocus] = useState(0);
  const [author, setAuthor] = useState(IDataToken);
  const [idUserApprove, setIdUserApprove] = useState("");
  const [roles, setRoles] = useState([]);
  const [formSearch, setFormSearch] = useState(IFormSearchMember);
  const [dataFilter, setDataFilter] = useState([]);

  // status = 1 : up role staff , status =2 : up role admin
  const [upRoleStatus, setUpRoleStatus] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const list = await listUser();
    const lstRole = await getLstRole();
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    var decoded = jwt_decode(token);

    if (decoded) {
      setAuthor(decoded);
    }

    setRoles(lstRole);
    setListMember(list);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(dataFilter.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataFilter.length / itemsPerPage));
  }, [dataFilter]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(listMember.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listMember.length / itemsPerPage));
  }, [listMember]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    if (formSearch.gender === 0 && formSearch.email === "" && formSearch.roleId === 0) {
      setPaginatedItems(listMember.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(listMember.length / itemsPerPage));
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
    let newOffset = (event.selected * itemsPerPage) % listMember.length;

    setItemOffset(newOffset);
    setPageFocus(event.selected);
  };

  const confirmModal = (id, status) => {
    setUpRoleStatus(status);
    setIdUserApprove(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setIdUserApprove("");
    setShowModal(false);
    setUpRoleStatus(0);
  };

  const ApproveRole = () => {
    if (upRoleStatus === 1) {
      approveRoleUserToStaff(idUserApprove);
    } else {
      approveRoleUserToAdmin(idUserApprove);
    }
  };

  const HandleSearch = (formData) => {
    console.log(formData);
    const lstFilter = listMember.filter((x) => HandleSearchItemMember(x, formData));

    setDataFilter(lstFilter);
  };

  const handlerReset = () => {
    setFormSearch(IFormSearchMember);
    HandleSearch(IFormSearchMember);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftTypography variant="h6" mt={3} ml={3}>
              Member table
            </SoftTypography>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <div className="flex">
                <label className="text-lg mt-1">
                  <small>Email : </small>
                </label>
                <input
                  type="text"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-72 p-2 ml-2 "
                  placeholder="email"
                  value={formSearch.email}
                  onChange={(e) => setFormSearch({ ...formSearch, email: e.target.value })}
                />
              </div>

              <div>
                <label className="text-lg mt-1">
                  <small>Gender : </small>
                </label>
                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400  w-72 p-2 ml-2 "
                  value={formSearch.gender}
                  onChange={(e) => setFormSearch({ ...formSearch, gender: e.target.value })}
                >
                  <option value={0}> Select Gender</option>
                  <option value={1}> Male</option>
                  <option value={2}> Female</option>
                </select>
              </div>

              <div>
                <label className="text-lg mt-1">
                  <small>Role : </small>
                </label>
                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 w-72 p-2 ml-2 "
                  value={formSearch.roleId}
                  onChange={(e) => setFormSearch({ ...formSearch, roleId: e.target.value })}
                >
                  <option value={""}>Select Role</option>
                  {roles.length > 0 &&
                    roles.map((item, index) => (
                      <option key={index} value={item.roleId}>
                        {item.roleName}
                      </option>
                    ))}
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
                {(author?.roles[0] === "Role_Admin" || author?.roles[0] === "Role_Super_Admin") && (
                  <Link to={"/member/create"}>
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
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Gender
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Roles
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Address
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date Of Birth
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.length > 0 &&
                      paginatedItems.map((u) => (
                        <tr key={u.userId} className="bg-white border-b hover:bg-gray-50">
                          <th
                            scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                          >
                            <div className="pl-3">
                              <div className="text-base font-semibold">{u.fullName}</div>
                              <div className="font-normal text-gray-500">{u.email}</div>
                            </div>
                          </th>
                          {u.gender === 1 ? (
                            <td className="px-6 py-4">Male</td>
                          ) : (
                            <td className="px-6 py-4">Female</td>
                          )}
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {u.roles[0].roleId === MEMBER ? (
                                <div
                                  data-te-chip-init
                                  data-te-ripple-init
                                  className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]"
                                  data-te-close="true"
                                >
                                  {u.roles[0].roleName}
                                </div>
                              ) : u.roles[0].roleId === ADMIN ? (
                                <div
                                  data-te-chip-init
                                  data-te-ripple-init
                                  className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-green-500 py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-white shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]"
                                  data-te-close="true"
                                >
                                  {u.roles[0].roleName}
                                </div>
                              ) : u.roles[0].roleId === SUPER_ADMIN ? (
                                <div
                                  data-te-chip-init
                                  data-te-ripple-init
                                  className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-red-500 py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-white shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]"
                                  data-te-close="true"
                                >
                                  {u.roles[0].roleName}
                                </div>
                              ) : (
                                <div
                                  data-te-chip-init
                                  data-te-ripple-init
                                  className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-sky-500 py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-white shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]"
                                  data-te-close="true"
                                >
                                  {u.roles[0].roleName}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">{u.phoneNumber}</td>
                          <td className="px-6 py-4">{u.address}</td>
                          <td className="px-6 py-4">{u.dateOfBirth}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {(u.roles[0].roleId === MEMBER ||
                                author.roles[0] === "Role_Super_Admin" ||
                                u.roles[0].roleId === STAFF) && (
                                <div
                                  className={`${"bg-amber-300  [word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] text-white"}`}
                                >
                                  <Link className="uppercase" to={"/member/edit/" + u.userId}>
                                    Edit
                                  </Link>
                                </div>
                              )}

                              {author.roles[0] !== undefined &&
                                author.roles[0] === "Role_Super_Admin" &&
                                (u.roles[0].roleId === MEMBER || u.roles[0].roleId === STAFF) && (
                                  <div className="flex">
                                    {u.roles[0].roleId !== STAFF && (
                                      <div
                                        className={`${"bg-sky-600 [word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] text-white"}`}
                                      >
                                        <button
                                          className="uppercase"
                                          type="button"
                                          onClick={() => confirmModal(u.userId, 1)}
                                        >
                                          Up role Staff
                                        </button>
                                      </div>
                                    )}

                                    <div
                                      className={`${"bg-green-600 [word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] text-white"}`}
                                    >
                                      <button
                                        className="uppercase"
                                        type="button"
                                        onClick={() => confirmModal(u.userId, 2)}
                                      >
                                        Up role Admin
                                      </button>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {listMember.length > 0 && (
                  <PagingList
                    handleChangeItemsPerPage={handleChangeItemsPerPage}
                    handlePageChange={handlePageChange}
                    item={listMember}
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
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Update Role Users</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <FontAwesomeIcon
                      className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none"
                      icon={faX}
                    />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Are you sure to up role this users?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-cyan-500 text-white active:bg-cyan-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => ApproveRole()}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </DashboardLayout>
  );
}

export default TablesUser;
