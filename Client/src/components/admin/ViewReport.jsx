import { createPortal } from "react-dom";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { resolveProblem } from "../../apis/problems-api";
import { useState } from "react";

export default function ViewReport({ open, onClose, details, id }) {

    const [s, setS] = useState(false)
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

  const resolve = async () => {

    try {
        let res = await resolveProblem(id)

        if(res.status == 200){
            setS(true)

            setTimeout(() => {
                setS(false)
            })
        }
    } catch (error) {
        
    }

  }

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
          className={`relative mx-auto mt-16 h-[30%] bg-s shadow-lgh w-[20%] max-w-screen-sm p-4 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out rounded-lg`}
        >
          <div className="absolute right-4 text-white">
            <button onClick={onClose}>
              <span>
                <AiOutlineClose />
              </span>
            </button>
          </div>
          
        <div className="mt-8 ml-8 mr-8 text-text-primary-dark">
          <h1 className="font-bold text-xl mb-2"> Details</h1>
          <p className="ml-2">{details}</p>
          <button className={s ? "mt-24 bg-green-600 text-black px-2 py-1 rounded-md hover:bg-text-active-dark hover:text-white duration-200 transition ease-in-out": "mt-24 bg-text-accent-dark text-black px-2 py-1 rounded-md hover:bg-text-active-dark hover:text-white duration-200 transition ease-in-out"} onClick={resolve}>Mark Resolved</button>
        </div>


        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
}
