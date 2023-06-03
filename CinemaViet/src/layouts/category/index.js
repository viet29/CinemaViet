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
import { ListCategory } from "API/category/category";
import PagingList from "layouts/utils/Pagination";
import { IDataToken } from "layouts/Init/initForm";
import jwt_decode from "jwt-decode";

export default function TablesCategory() {
  const [lstCategory, setListCategory] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageFocus, setPageFocus] = useState(0);
  const [author, setAuthor] = useState(IDataToken);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const list = await ListCategory();
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    var decoded = jwt_decode(token);

    if (decoded) {
      setAuthor(decoded);
    }
    setListCategory(list);
  };
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(lstCategory.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(lstCategory.length / itemsPerPage));
  }, [lstCategory]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(lstCategory.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(lstCategory.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, pageFocus]);

  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setItemOffset(0);
    setPageFocus(0);
  };

  const handlePageChange = (event) => {
    let newOffset = (event.selected * itemsPerPage) % lstCategory.length;

    setItemOffset(newOffset);
    setPageFocus(event.selected);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Category Table</SoftTypography>
              {(author?.roles[0] === "Role_Admin" || author?.roles[0] === "Role_Super_Admin") && (
                <Link to={"/category/create"}>
                  <SoftButton variant="gradient" color="info">
                    Create New
                  </SoftButton>
                </Link>
              )}
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
                        Category Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Parent Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
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
                      paginatedItems.map((cate) => (
                        <tr key={cate.categoryId} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">{cate.categoryName}</td>
                          <td className="px-6 py-4">{cate.parentCateName}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div
                                className={`${
                                  cate.status === 1 ? "text-green-500" : "text-neutral-500"
                                }`}
                              >
                                {cate.status === 1 ? "WORKING" : "OFF"}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">{cate.createByUserEmail}</td>
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
                                  <Link to={"/category/edit/" + cate.categoryId}>UPDATE</Link>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {lstCategory.length > 0 && (
                  <PagingList
                    handleChangeItemsPerPage={handleChangeItemsPerPage}
                    handlePageChange={handlePageChange}
                    item={lstCategory}
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
