import { Card, FormHelperText } from "@mui/material";
import { saveSeat } from "API/seat/seat";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useForm } from "react-hook-form";

const { default: Footer } = require("examples/Footer");
const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

export default function CreateSeat() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitNewUser = async (data) => {
    console.log(data);
    await saveSeat(data);
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
                        Seat Name
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      id="stand"
                      placeholder="Seat Name"
                      {...register("stand", { required: true })}
                    />
                    {errors.seatName && (
                      <FormHelperText error id="component-error-text">
                        Seat Name is required
                      </FormHelperText>
                    )}
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Vip
                      </SoftTypography>
                    </SoftBox>
                    <select
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                      {...register("isVip")}
                    >
                      <option value="">Select...</option>
                      <option value="1">Vip</option>
                      <option value="0">Normal</option>
                    </select>
                  </SoftBox>
                </div>
              </div>
              <SoftBox mt={4} mb={1}>
                <SoftButton type="submit" variant="gradient" color="info">
                  Create
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}
