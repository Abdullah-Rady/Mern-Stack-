import React, {useState} from "react";
import { BsStar } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

const RatingDynamic = ({filled, setFilled, nonFilled, setNonFilled, onHover}) => {



  return (
    <div className="flex flex-row text-yellow-500 font-light items-center">
      {[...Array(filled)].map((e, i) => {
          return <div className="mr-px" key={i} onClick={() => onHover(i + 1)}><BsStarFill /></div>;
      })}
        {[...Array(nonFilled)].map((e, i) => {
            return <div className="mr-px" key={i} onClick={() => onHover(i + filled + 1)}><BsStar /></div>;
      })}
        {

        }
    </div>
  );
};

export default RatingDynamic;
