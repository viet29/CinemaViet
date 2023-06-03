import { Card, FormHelperText } from "@mui/material";
import { saveRoom } from "API/room/room";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const { default: Footer } = require("examples/Footer");
const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

export default function CreateRoom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitNewRoom = async (data) => {
    console.log(data);
    await saveRoom(data);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              onSubmit={handleSubmit(onSubmitNewRoom)}
              component="form"
              role="form"
              p={2}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Room Name
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      id="roomName"
                      placeholder="Room Name"
                      {...register("roomName", { required: true })}
                    />
                    {errors.directorName && (
                      <FormHelperText error id="component-error-text">
                        Director Name is required
                      </FormHelperText>
                    )}
                  </SoftBox>
                </div>
              </div>
              <SoftBox mt={3} mb={1}>
                <SoftButton type="submit" variant="gradient" color="info">
                  Create
                </SoftButton>
                <Link to="/room" className="ml-4">
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
