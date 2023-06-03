import { Card, FormHelperText } from "@mui/material";
import { getUserInfoById } from "API/authentitication/auth";
import { createUser } from "API/member/user";
import { VALIDATIONEMAIL } from "AppConstants";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const { default: Footer } = require("examples/Footer");
const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");

  const validationEmail = {
    ...register("email", {
      required: true,
      pattern: VALIDATIONEMAIL,
    }),
  };

  const onSubmitNewUser = async (data) => {
    const checkDuplicateUserName = await getUserInfoById(data.username);

    if (!checkDuplicateUserName) {
      createUser(data);
    } else {
      setMessage("username is exist");
    }
    console.log(data);
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
                        Username
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      id="username"
                      placeholder="Username"
                      {...register("username", { required: true })}
                    />
                    {errors.username && (
                      <FormHelperText error id="component-error-text">
                        Username is required
                      </FormHelperText>
                    )}
                    {message && (
                      <FormHelperText error id="component-error-text">
                        Username is exist
                      </FormHelperText>
                    )}
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Fullname
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      id="fullName"
                      placeholder="Fullname"
                      {...register("fullName", { required: true })}
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
                            Birthday
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput
                          id="dateOfBirth"
                          type="date"
                          {...register("dateOfBirth", { required: true })}
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
                      <SoftInput id="email" placeholder="Email" {...validationEmail} />
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
                        Password
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      id="password"
                      type={"password"}
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <FormHelperText error id="component-error-text">
                        Password is required
                      </FormHelperText>
                    )}
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Address
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      id="address"
                      placeholder="Address"
                      {...register("address", { required: true })}
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
                      id="phoneNumber"
                      placeholder="Phone number"
                      {...register("phoneNumber", { required: true })}
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
                  Create
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

export default CreateUser;
