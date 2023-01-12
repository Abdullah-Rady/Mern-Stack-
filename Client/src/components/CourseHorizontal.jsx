import React from "react";
import Rating from "./Rating";
import useLocalStorageStore from "../hooks/useLocalStorage";


const CourseHorizontal = ({ course }) => {
  const local = useLocalStorageStore()

  return (
    <div className="flex flex-col px-2 py-3  border-gray-200 group border-b-2 hover:border-blue-400 transition duration-200 ease-in-out cursor-pointer rounded-xl mr-4">

        <div className="mb-2 w-full h-full border-2 rounded-lg overflow-hidden">
        <img src={course.img} className="bg-cover group-hover:brightness-75" />
      </div>

      <div className="">
        <h1 className="font-bold mb-2">{course.title}</h1>
        <p className="text-sm text-gray-500 font-light text-[12px] mb-1">
          {course.author}
        </p>
        <Rating
          data={{
            rating: parseInt(course.rating["$numberDecimal"]),
            number: parseFloat(course.numberOfRatings),
          }}
        />
      </div>

      <div className="mt-2">
        <h1 className="font-bold"> {`${parseFloat(course.price["$numberDecimal"] * local.get('exchangeRate')).toFixed(2)} ${local.get('C')}`}</h1>
      </div>

    </div>
  );
};

export default CourseHorizontal;
