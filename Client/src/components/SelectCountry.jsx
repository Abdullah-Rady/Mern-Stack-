import { createPortal } from "react-dom";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { countries } from "../utils/countries";
import useLocalStorageStore from "../hooks/useLocalStorage";
import { getRate } from "../apis/currency-api";

export default function SelectCountry({ open, onClose }) {
  const storage = useLocalStorageStore();

  const click = async (code, cur) => {
    try {
      let res = await getRate("USD", cur);
      storage.set("exchangeRate", res.new_amount);
      storage.set("C", cur);
    } catch (error) {
      console.log(error);
    }
  };

  function escHandler({ key }) {
    if (key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", escHandler);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", escHandler);
      }
    };
  }, []);

  if (typeof document !== "undefined") {
    return createPortal(
      <div className={`fixed inset-0 ${open ? "" : "pointer-events-none"}`}>
        {/* backdrop */}
        <div
          className={`fixed inset-0 bg-black ${
            open ? "opacity-50" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out`}
          onClick={onClose}
        />

        {/* content */}
        <div
          className={`relative mx-auto mt-16 h-[30%] overflow-scroll bg-white shadow-lgh w-[20%] max-w-screen-sm p-4 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out rounded-lg`}
        >
          {/* X icon */}
          <div className="absolute right-4">
            <button onClick={onClose}>
              <span>
                <AiOutlineClose />
              </span>
            </button>
          </div>

          <div className="pt-3 mb-3 font-bold">
            <h1>Select Country</h1>
          </div>
          {countries.map((country) => {
            return (
              <div
                className="border-b p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  click(country.countryCode, country.currencyCode);
                  onClose();
                }}
              >
                {country.countryName}
              </div>
            );
          })}
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
}
