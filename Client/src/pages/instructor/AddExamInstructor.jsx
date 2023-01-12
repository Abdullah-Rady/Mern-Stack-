import React from "react";
import AddExam from "../../components/instructor/AddExam";
import SidebarInstructor from "../../components/instructor/SideBarInstructor";

const AddExamInstructor = () => {

 
  return (
    <div className="flex flex-row w-full h-full bg-s">
      <SidebarInstructor />
      <AddExam />
    </div>
  );
};

export default AddExamInstructor;
