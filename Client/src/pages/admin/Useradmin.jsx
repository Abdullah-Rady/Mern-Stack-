import React from "react";
import Sidebar from "../../components/admin/SideBar";
import AddUser from "./AddUser";

const Useradmin = () => {
  return (
    <div className="flex bg-s ">
      <Sidebar />
      <div className="overflow-scroll bg-s w-4/5">
        <h1 className="text-4xl text-text-primary-dark font-semibold mt-20  ml-4">
          CREATE USER
        </h1>
        <p className="text-text-accent-dark mb-20 ml-4">
          Create a New User Profile
        </p>
        <AddUser />
      </div>
    </div>
  );
};

export default Useradmin;
