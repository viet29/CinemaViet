import React from "react";
import { Card, FormHelperText } from "@mui/material";
import { saveSeat } from "API/seat/seat";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getSeatById } from "API/seat/seat";
const { default: Footer } = require("examples/Footer");
const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

export default function UpdateSeat() {
  const { seatId } = useParams();
  const [seat, setSeat] = useState({});
  const [stand, setStand] = useState();
  const [vip, setVip] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const current = await getSeatById(seatId);
    if (current) {
      setSeat(current);
      setStand(current.stand);
      setVip(current.vip);
    }
  };

  const onSubmitSeat = async (data) => {
    console.log(seat);
    data.id = seatId;
    data.stand = stand;
    data.isVip = vip;
    saveSeat(data);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox onSubmit={handleSubmit(onSubmitSeat)} component="form" role="form" p={2}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Seat Name
                      </SoftTypography>
                    </SoftBox>
                    <input
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                      type="text"
                      value={stand != null ? stand : ""}
                      onChange={(e) => setStand(e.target.value)}
                    />
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Vip
                      </SoftTypography>
                    </SoftBox>
                    <select
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                      {...register("vip")}
                      value={vip}
                      onChange={(e) => setVip(e.target.value)}
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
