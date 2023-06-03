import { Card, FormHelperText } from "@mui/material";
import { checkDuplicateDir } from "API/director/director";
import { saveDirector } from "API/director/director";
import { UploadFileImageDir } from "API/movie/movie";
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

export default function CreateDirector() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [currentFileName, setCurrentFileName] = useState("");

  const onSubmitNewDirector = async (data) => {
    data["directorImage"] = currentFileName;
    console.log(data);
    const checkExist = await checkDuplicateDir(data);
    if (!checkExist) {
      await saveDirector(data);
    } else {
      setMessage(checkExist);
    }
  };

  const handleOnchangeFile = async (e) => {
    const form_data = new FormData();
    const files = e.target.files;

    form_data.append("file", files[0]);
    const fileName = await UploadFileImageDir(form_data);

    setCurrentFileName(fileName);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              onSubmit={handleSubmit(onSubmitNewDirector)}
              component="form"
              role="form"
              p={2}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Director Name
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      id="directorName"
                      placeholder="Director Name"
                      {...register("directorName", { required: true })}
                    />
                    {errors.directorName && (
                      <FormHelperText error id="component-error-text">
                        Director Name is required
                      </FormHelperText>
                    )}
                    {message && (
                      <FormHelperText error id="component-error-text">
                        Director Name is Existed
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
              <SoftBox mt={3} mb={1}>
                <SoftButton type="submit" variant="gradient" color="info">
                  Create
                </SoftButton>
                <Link to="/director" className="ml-4">
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
