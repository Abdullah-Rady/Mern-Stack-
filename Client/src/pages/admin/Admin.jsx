import React from "react";
import Chart from "../../components/admin/Chart";
import FuturedInfo from "../../components/admin/FuturedInfo";
import Sidebar from "../../components/admin/SideBar";
import { userData } from "../../utils/dummyData";

const Admin = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="grow overflow-scroll bg-gray-200">
        <FuturedInfo />
        <Chart
          data={userData}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
      </div>
    </div>
  );
};

export default Admin;
