import React, { useState } from "react";
import CourseHorizontal from "./CourseHorizontal";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import {Link} from "react-router-dom"

const classNames = {
  icon: "hover:scale-125 cursor-pointer",
  iconDisabled: "text-gray-300 cursor-no-drop",
};

const CoursesSlider = ({courses}) => {
  
  const [x, setX] = useState(0);

  const handelClick = (name) => {
    if (name === "left") {
      if (x < 0) setX((x) => x + 200);
    } else {
      setX((x) => x - 200);
    }
  };

  return (
    <div className="flex row items-center justify-center ">
      <div className=" text-3xl z-[100] flex flex-col justify-center text-black  px-3">
        <IoIosArrowDropleftCircle
          className={x != 0 ? classNames.icon : classNames.iconDisabled}
          onClick={() => handelClick("left")}
        />
      </div>

      <div className="overflow-hidden w-full">
        <div
          className={
            "transform transition duration-200 linear flex flex-row gap-4"
          }
          style={{
            transform: `translateX(${x}px)`,
          }}
        >
         
          {
            courses && courses.map((course, i) => {
                return (<Link to={`/course/${course._id}`}> <CourseHorizontal key={i} course={course}/> </Link>)
            })
          }
        </div>
      </div>

      <div className=" text-3xl z-[100] flex flex-col justify-center text-black px-3">
        <IoIosArrowDroprightCircle
          className="hover:scale-125 transition duration-200 ease-in-out cursor-pointer"
          name="right"
          onClick={() => handelClick("right")}
        />
      </div>
    </div>
  );
};

export default CoursesSlider;
