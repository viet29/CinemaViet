import { Card, FormHelperText } from "@mui/material";
import { getUserInfoById } from "API/authentitication/auth";
import { SaveCategory } from "API/category/category";
import { ListParentCategory } from "API/category/category";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";
import { checkDuplicateCategory } from "API/category/category";
import { Link } from "react-router-dom";

const { default: Footer } = require("examples/Footer");
const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

export default function CreateCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [lstCateParent, setLstCateParent] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [message , setMessage] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const lstCate = await ListParentCategory();
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    var decoded = jwt_decode(token);

    const user = await getUserInfoById(decoded.sub);
    if (user) {
      setUserInfo(user);
    }

    if (lstCate) {
      setLstCateParent(lstCate);
    }
  };

  const onSubmitNewUser = async (data) => {
    data["createBy"] = userInfo.userId;

    const checkExist  = await checkDuplicateCategory(data);

    if(!checkExist){
      await SaveCategory(data);
    }else{
      setMessage(checkExist)
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
                        Category Name
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      id="categoryName"
                      placeholder="Category Name"
                      {...register("categoryName", { required: true })}
                    />
                    {errors.categoryName && (
                      <FormHelperText error id="component-error-text">
                        Category Name is required
                      </FormHelperText>
                    )}
                    {message && (
                      <FormHelperText error id="component-error-text">
                        Category Name is Existed
                      </FormHelperText>
                    )}
                  </SoftBox>

                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Parent Category Name
                      </SoftTypography>
                    </SoftBox>
                    <select
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                      {...register("parentCate")}
                    >
                      <option value="">Select...</option>
                      {lstCateParent.length > 0 &&
                        lstCateParent.map((cate) => (
                          <option key={cate.categoryId} value={cate.categoryId}>
                            {cate.categoryName}
                          </option>
                        ))}
                    </select>
                    {errors.parentCate && (
                      <FormHelperText error id="component-error-text">
                        Parent Category is required
                      </FormHelperText>
                    )}
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
                        {...register("status", { required: true })}
                      >
                        <option value="1">Working</option>
                        <option value="2">Off</option>
                      </select>
                    </SoftBox>
                  </SoftBox>
                </div>
              </div>
              <SoftBox mt={4} mb={1}>
                <SoftButton type="submit" variant="gradient" color="info">
                  Create
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
