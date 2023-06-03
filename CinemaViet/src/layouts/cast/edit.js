import React from "react";
import { Card, FormHelperText } from "@mui/material";
import { getCastbyId } from "API/cast/cast";
import { saveCast } from "API/cast/cast";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { UploadFileImageCast } from "API/movie/movie";
const { default: Footer } = require("examples/Footer");
const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

export default function UpdateCast() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { castId } = useParams();

  const [cast, setCast] = useState({});
  const [currentFileName, setCurrentFileName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const current = await getCastbyId(castId);
    if (current) {
      console.log(castId);
      console.log(current);
      setCast(current);
    }
  };

  const onSubmitNewUser = async (data) => {
    cast['image'] = currentFileName;
    await saveCast(cast);
  };

  const handleOnchange = (event) => {
    const fields = { ...cast };

    fields["castName"] = event.target.value;
    setCast(fields);
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
                    <input
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                      type="text"
                      value={cast != null ? cast.castName : ""}
                      onChange={handleOnchange}
                    />
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
                  Update
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
