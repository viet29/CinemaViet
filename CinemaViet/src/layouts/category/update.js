import { Card } from "@mui/material";
import { SaveCategory } from "API/category/category";
import { GetCategoryById } from "API/category/category";
import { ListParentCategory } from "API/category/category";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { CateForm } from "layouts/Init/initCate";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getUserInfoById } from "API/authentitication/auth";

const { default: Footer } = require("examples/Footer");
const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

export default function UpdateCategory() {
  const { cateId } = useParams();

  const [lstCateParent, setLstCateParent] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [currentCate, setCurrentCate] = useState({});
  const [newCate, setNewCate] = useState(CateForm);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const cate = await GetCategoryById(cateId);
    const lstCate = await ListParentCategory();
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    var decoded = jwt_decode(token);

    const user = await getUserInfoById(decoded.sub);
    if (user) {
      setUserInfo(user);
    }


    if (cate) {
      setCurrentCate(cate);
      addValueInit(cate);
    }

    if (lstCate) {
      setLstCateParent(lstCate);
    }
  };

  const addValueInit = (cate) => {
    let fields = { ...newCate };
    fields["categoryId"] = cate.categoryId;
    fields["categoryName"] = cate.categoryName;
    fields["createBy"] = cate.createByUserId;
    fields["parentCate"] = cate.parentCateId;
    fields["status"] = cate.status;

    setNewCate(fields);
  };

  const handleOnChange = (event, currentField, field) => {
    let currentFields = { ...currentCate };
    let fields = { ...newCate };
    var value = event.target.value;
    fields[field] = value;
    currentFields[currentField] = value;

    setCurrentCate(currentFields);
    setNewCate(fields);
  };

  const onSubmitNewUser = async () => {
    newCate.createBy = userInfo.userId;
    await SaveCategory(newCate);
    console.log(newCate);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox component="form" role="form" p={2}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Category Name
                      </SoftTypography>
                    </SoftBox>
                    <input
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                      id="categoryName"
                      placeholder="Category Name"
                      value={currentCate.categoryName}
                      onChange={(e) => handleOnChange(e, "categoryName", "categoryName")}
                    />
                  </SoftBox>

                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Parent Category Name
                      </SoftTypography>
                    </SoftBox>
                    <select
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                      value={currentCate.parentCate}
                      onChange={(e) => handleOnChange(e, "parentCateId", "parentCate")}
                    >
                      <option value="">Select...</option>
                      {lstCateParent.length > 0 &&
                        lstCateParent.map((cate) => (
                          <option
                            key={cate.categoryId}
                            value={cate.categoryId}
                            selected={currentCate.parentCateId === cate.categoryId ? true : false}
                          >
                            {cate.categoryName}
                          </option>
                        ))}
                    </select>
                  </SoftBox>

                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Create By :
                        <input
                          type="text"
                          disabled
                          value={userInfo.fullName ? userInfo.fullName : ""}
                        />
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                  <SoftBox>
                    <SoftBox ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Active :
                      </SoftTypography>
                      <select
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                        value={currentCate.status}
                        onChange={(e) => handleOnChange(e, "status", "status")}
                      >
                        <option value="1" selected={currentCate.status === 1 ? true : false}>
                          Working
                        </option>
                        <option value="2" selected={currentCate.status === 2 ? true : false}>
                          Off
                        </option>
                      </select>
                    </SoftBox>
                  </SoftBox>
                </div>
              </div>
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="info" onClick={() => onSubmitNewUser()}>
                  Update
                </SoftButton>
                <Link to="/category" className="ml-4">
                  <SoftButton variant="gradient" color="secondary">
                    Back to List
                  </SoftButton>
                </Link>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}
