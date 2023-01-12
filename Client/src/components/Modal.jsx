import { createPortal } from "react-dom";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal({ open, onClose, children }) {
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
          className={`relative mx-auto mt-16 h-[30%] bg-white shadow-lgh w-[20%] max-w-screen-sm p-4 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out rounded-lg`}
        >
          <div className="absolute right-4">
            <button onClick={onClose}>
              <span>
                <AiOutlineClose />
              </span>
            </button>
          </div>
          {/* <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                        </svg> */}
          {children}
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
}
