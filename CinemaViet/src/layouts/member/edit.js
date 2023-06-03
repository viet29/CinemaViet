import { Card, FormHelperText } from "@mui/material";
import { userInfo } from "API/member/user";
import { editUser } from "API/member/user";
import { VALIDATIONEMAIL } from "AppConstants";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

const { default: Footer } = require("examples/Footer");
const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

const EditUser = () => {
  const userId = useParams();
  const [username, setUsername] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const validationEmail = {
    ...register("email", {
      required: true,
      pattern: VALIDATIONEMAIL,
    }),
  };

  const onSubmit = (data) => {
    data.username = username;
    data["userId"] = userId.userId;
    console.log(data);
    editUser(data);
  };

  const fetchData = async () => {
    const user = await userInfo(userId.userId);
    setUsername(user.userName);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setAddress(user.address);
    setGender(user.gender);
    setDateOfBirth(user.dateOfBirth);
    setFullName(user.fullName);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox onSubmit={handleSubmit(onSubmit)} component="form" role="form" p={2}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Username
                      </SoftTypography>
                    </SoftBox>
                    <input
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                      value={username}
                      id="username"
                      placeholder="Username"
                    />
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Fullname
                      </SoftTypography>
                    </SoftBox>
                    <input
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                      id="fullName"
                      value={fullName}
                      placeholder="Fullname"
                      {...register("fullName", { required: true })}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {errors.fullName && (
                      <FormHelperText error id="component-error-text">
                        Fullname is required
                      </FormHelperText>
                    )}
                  </SoftBox>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Gender
                          </SoftTypography>
                        </SoftBox>
                        <select
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                          {...register("gender", { required: true })}
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value={1}>Male</option>
                          <option value={2}>Female</option>
                        </select>
                        {errors.gender && (
                          <FormHelperText error id="component-error-text">
                            Gender is required
                          </FormHelperText>
                        )}
                      </SoftBox>
                    </div>
                    <div>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Date Of Birth
                          </SoftTypography>
                        </SoftBox>
                        <input
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                          id="dateOfBirth"
                          type="date"
                          {...register("dateOfBirth", { required: true })}
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                        {errors.dateOfBirth && (
                          <FormHelperText error id="component-error-text">
                            Day of birth is required
                          </FormHelperText>
                        )}
                      </SoftBox>
                    </div>
                  </div>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Email
                      </SoftTypography>
                      <input
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                        id="email"
                        placeholder="Email"
                        {...validationEmail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <FormHelperText error id="component-error-text">
                          Email is required
                        </FormHelperText>
                      )}
                    </SoftBox>
                  </SoftBox>
                </div>
                <div>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Address
                      </SoftTypography>
                    </SoftBox>
                    <input
                      id="address"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                      placeholder="Address"
                      {...register("address", { required: true })}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && (
                      <FormHelperText error id="component-error-text">
                        Address is required
                      </FormHelperText>
                    )}
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Phone number
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                      id="phoneNumber"
                      placeholder="Phone number"
                      {...register("phoneNumber", { required: true })}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {errors.phoneNumber && (
                      <FormHelperText error id="component-error-text">
                        Phone Number is required
                      </FormHelperText>
                    )}
                  </SoftBox>
                </div>
              </div>
              <SoftBox mt={4} mb={1}>
                <SoftButton type="submit" variant="gradient" color="info">
                  Save
                </SoftButton>
                <Link to="/member" className="ml-4">
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
};

export default EditUser;
