import { Card, FormHelperText } from "@mui/material";
import { checkDuplicate } from "API/cast/cast";
import { saveCast } from "API/cast/cast";
import { UploadFileImageCast } from "API/movie/movie";
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

export default function CreateCast() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [currentFileName, setCurrentFileName] = useState("");

  const onSubmitNewUser = async (data) => {
    data["image"] = currentFileName;
    console.log(data);
    const checkExists = await checkDuplicate(data);
    console.log(checkExists);
    if (!checkExists) {
      await saveCast(data);
    } else {
      setMessage(checkExists);
    }
  };

  const handleOnchangeFile = async (e) => {
    const form_data = new FormData();
    const files = e.target.files;

    form_data.append("file", files[0]);
    const fileName = await UploadFileImageCast(form_data);

    setCurrentFileName(fileName);
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
                        Cast Name
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      id="castName"
                      placeholder="Cast Name"
                      {...register("castName", { required: true })}
                    />
                    {errors.castName && (
                      <FormHelperText error id="component-error-text">
                        Cast Name is required
                      </FormHelperText>
                    )}
                    {message && (
                      <FormHelperText error id="component-error-text">
                        Cast Name is Existed
                      </FormHelperText>
                    )}
                  </SoftBox>
                </div>
                <div>
                  <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Avatar
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput id="image" type="file" onChange={handleOnchangeFile} />
                  </SoftBox>
                </div>
              </div>
              <SoftBox mt={4} mb={1}>
                <SoftButton type="submit" variant="gradient" color="info">
                  Create
                </SoftButton>
                <Link to="/cast" className="ml-4">
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
