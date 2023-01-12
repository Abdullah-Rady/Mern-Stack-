import React from "react";
import Sidebar from "../../components/admin/SideBar";
import Requests from "../../components/admin/Requests";


const Useradmin = () => {
  return (
    <div className="flex bg-s ">
      <Sidebar />
      <div className="overflow-scroll bg-s w-4/5">
        
        <Requests />
      </div>
    </div>
  );
};

export default Useradmin;
