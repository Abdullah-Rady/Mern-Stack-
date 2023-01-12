import React from "react";
import Rating from "./Rating";
import useLocalStorageStore from "../hooks/useLocalStorage";


const CourseVertical = ({ course }) => {
  const local = useLocalStorageStore()

  return (
    <div>
      <div className="flex flex-column w-full px-2 py-3 border-b-2 border-gray-200 group cursor-pointer hover:border-blue-400 transition duration-200 ease-in-out rounded-xl mb-4">
        <div className="mr-2 w-1/3 h-full border-2 rounded-lg overflow-clip">
          <img
            src={course.img}
            className="object-contain group-hover:brightness-75"
          />
        </div>

        <div className="">
          <h1 className="font-bold mb-2">{course.title}</h1>
          <p className="text-sm text-light mb-2 pr-2">{course.description}</p>
          <p className="text-sm text-gray-500 font-light text-[12px] mb-1 ">
            {course.author}
          </p>
          <Rating
            data={{
              rating: parseInt(course.rating / course.numberOfRatings),
              number: parseFloat(course.numberOfRatings),
            }}
          />

          <p className="text-sm text-gray-500 font-light text-[12px] mt-1">
            {course.hours} hours
          </p>
        </div>

        <div className=" ml-auto ">
          <h1 className="font-bold">  {`${parseFloat(course.price["$numberDecimal"] * local.get('exchangeRate')).toFixed(2)} ${local.get('C')}`}</h1>
        </div>
      </div>
    </div>
  );
};

export default CourseVertical;
