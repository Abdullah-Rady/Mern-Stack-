import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ changeKeyword, search }) => {
  return (
    <div className="w-1/2 border-2 rounded-full border-solid py-1 px-2 bg-gray-100">
      <div className=" w-100 relative flex flex-row  w-full bg-gray-100">
        <input
          type="search"
          required
          className="relative flex-auto outline-0 outline-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100"
          placeholder="Search for anything"
          aria-label="Search"
          onChange={(e) => changeKeyword(e)}
        />
        <button
          className="btn inline-block px-6 py-2.5 text-gray-600 font-medium text-xs leading-tight uppercase  flex items-center"
          type="button"
          id="button-addon2"
          onClick={search}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="search"
            className="w-4"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
