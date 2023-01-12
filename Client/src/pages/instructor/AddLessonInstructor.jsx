import React from "react";
import Addlesson from "../../components/instructor/Addlesson";
import SidebarInstructor from "../../components/instructor/SideBarInstructor";

const AddLessonInstructor = () => {

 
  return (
    <div className="flex flex-row w-full h-full bg-s">
      <SidebarInstructor />
      <Addlesson />
    </div>
  );
};

export default AddLessonInstructor;
