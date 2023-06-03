import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText } from "@mui/material";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useForm } from "react-hook-form";
import { handleRegister } from "API/authentitication/auth";
import { VALIDATIONEMAIL } from "AppConstants";
import { checkDuplicateRegister } from "API/authentitication/auth";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);
  const [message, setMessage] = useState("");

  const validationEmail = {
    ...register("email", {
      required: true,
      pattern: VALIDATIONEMAIL,
    }),
  };

  const onSubmitSignup = async (data) => {
    const checkDuplicateUserName = await checkDuplicateRegister(data.username);

    if (!checkDuplicateUserName) {
      handleRegister(data);
    } else {
      setMessage("username is exist");
    }
  };

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox onSubmit={handleSubmit(onSubmitSignup)} component="form" role="form">
            <SoftBox mb={2}>
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
              <SoftInput id="email" type="email" placeholder="Email" {...validationEmail} />
              {errors.email && (
                <FormHelperText error id="component-error-text">
                  Email is required
                </FormHelperText>
              )}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <FormHelperText error id="component-error-text">
                  Password is required
                </FormHelperText>
              )}
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
