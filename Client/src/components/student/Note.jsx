import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiNote } from "react-icons/bi";
import { memo } from "react";
import jsPdf from 'jspdf'


const Note = ({ open, onClose, children }) => {
  const [note, setNote] = useState("");
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

  const makePdf = () => {
    const doc = new jsPdf()
    doc.text(note, 10, 10)
    doc.save("a4.pdf")
    }

  if (typeof document !== "undefined") {
    return createPortal(
      <div className={`fixed inset-0 ${open ? "" : "pointer-events-none"}`}>
        {/* backdrop */}
        <BiNote className="text-2xl text-white" />

        <div
          className={`fixed inset-0 bg-black ${
            open ? "opacity-50" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out`}
          onClick={onClose}
        />

        {/* content */}
        <div
          className={`relative mx-auto mt-16 h-[35%] bg-s shadow-lgh w-[25%] max-w-screen-sm p-4 ${
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

          <div className="mt-6 text-text-primary-dark">
            <label htmlFor="note" className="text-l mb-2 font-medium">
              Note
            </label>
            <textarea
              id="note"
              name="note"
              rows={7}
              className="shadow-sm bg-i focus:outline-none focus:outline focus:outline-indigo-500 block w-full sm:text-sm rounded-md p-2"
              defaultValue={""}
              style={{ resize: "none" }}
              onChange={(e) => setNote(e.target.value)}
            />
            <button onClick={makePdf} className="mt-4 mr-3 px-4 py-2 rounded-md hover:text-white bg-text-accent-dark text-black hover:bg-text-active-dark transition duration-200 ease-in-out"> Download as Pdf </button>

          </div>
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
}

export default memo(Note)