import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";

const classNames = {
  wrapper: "flex flex-row w-auto justify-between gap-20 p-4",
  card: "flex-1 my-2 p-6 rounded-xl cursor:pointer shadow-lg bg-accent",
  cardHeader: "text-lg",
  cardDetails: "flex flex-row align-center mt-4",
  cardSpan: "text-3xl font-semibold ",
  cardNegativeIcon: "text-negative-3 text-2xl ml-2",
  cardPositiveIcon: "text-positive-3 text-2xl ml-2",
  cardData: "ml-8 flex flex-row items-center",
  cardP: "text-gray-500 font-light mt-4",
};

const FuturedInfo = () => {
  return (
    <div className={classNames.wrapper}>
      <div className={classNames.card}>
        <span className={classNames.cardHeader}>Revanue</span>
        <div className={classNames.cardDetails}>
          <span className={classNames.cardSpan}>$2,415</span>
          <div className={classNames.cardData}>
            <div> -11.4 </div>
            <AiOutlineArrowDown className={classNames.cardNegativeIcon} />
          </div>
        </div>
        <p className={classNames.cardP}>Compared to last month</p>
      </div>
      <div className={classNames.card}>
        <span className={classNames.cardHeader}>Revanue</span>
        <div className={classNames.cardDetails}>
          <span className={classNames.cardSpan}>$2,415</span>
          <div className={classNames.cardData}>
            <div> -1.4 </div>
            <AiOutlineArrowDown className={classNames.cardNegativeIcon} />
          </div>
        </div>
        <p className={classNames.cardP}>Compared to last month</p>
      </div>
      <div className={classNames.card}>
        <span className={classNames.cardHeader}>Revanue</span>
        <div className={classNames.cardDetails}>
          <span className={classNames.cardSpan}>$2,415</span>
          <div className={classNames.cardData}>
            <div> +2.4 </div>
            <AiOutlineArrowUp className={classNames.cardPositiveIcon} />
          </div>
        </div>
        <p className={classNames.cardP}>Compared to last month</p>
      </div>
    </div>
  );
};

export default FuturedInfo;
