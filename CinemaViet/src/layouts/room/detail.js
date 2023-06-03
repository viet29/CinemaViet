import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
const { default: Footer } = require("examples/Footer");
const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

const DetailRoom = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={2}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex pt-3">
                    <span className="pr-3 text-base font-medium">Title:</span>
                    <span className="uppercase text-base">
                      Detial ko phải là xóa nhé
                    </span>
                  </div>
                </div>
                <div>                 
                </div>
              </div>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default DetailRoom;
