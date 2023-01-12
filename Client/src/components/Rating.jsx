import React from "react";
import { BsStar } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

const Rating = ({ data }) => {

  let rating = data.rating;

  let filled = Math.round(rating);
  let halfStar = undefined;
  let is = 0;

  if (filled < rating) {
    halfStar = 1;
    is = 1;
  }

  if (!filled) {
    filled = 0
  }


  return (
    <div className="flex flex-row text-[12px] text-yellow-500 font-light items-center">
      {filled !== 0 && [...Array(filled)].map((e, i) => {
        return <BsStarFill key={i} />;
      })}
      {halfStar && <BsStarHalf />}
      {[...Array(5 - filled - is)].map((e, i) => {
        return <BsStar key={i} />;
      })}

      {data.number && <p className="ml-1 text-gray-500">({data.number})</p>}
    </div>
  );
};

export default Rating;
