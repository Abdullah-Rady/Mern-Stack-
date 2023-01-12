import { createPortal } from "react-dom";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import { postReport } from "../apis/problems-api";

const classNames = {
  input:
    "px-2 py-1 mt-1 rounded-t-md bg-i ouline-none appearance-none border-b border-p focus:border-ib transition duration-200 ease-in-out focus:outline-none",
  inputError:
    "px-2 py-1 mt-1 rounded-t-md bg-i ouline-none appearance-none border-b border-negative-3 focus:border-negative-3 transition duration-200 ease-in-out focus:outline-none",
  input1:
    "px-2 py-1 mt-1 rounded-t-md bg-i ouline-none  border-b border-p focus:border-ib transition duration-200 ease-in-out focus:outline-none",
  inputError1:
    "px-2 py-1 mt-1 rounded-t-md bg-i ouline-none  border-b border-negative-3 focus:border-negative-3 transition duration-200 ease-in-out focus:outline-none",
};

export default function ReportProblem({ open, onClose, userid, courseid }) {
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

  const handleFormSubmit = async (values) => {
      try {
        let res = await postReport({...values, userid: userid, courseid: courseid})
        if (res.status === 200) {
          console.log("Successfully submitted");
        }
      } catch (error) {
        console.log(error);
      }
  };

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
          className={`relative mx-auto mt-16 min-h-[43%] bg-s shadow-lgh min-w-[15%] max-w-screen-sm p-4 ${
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

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({ values, errors, touched }) => (
              <div className="ml-6 mr-6">
                <h1 className="text-2xl mb-8 text-text-primary-dark font-bold mt-4">
                  Report Problem
                </h1>
                <div className="flex flex-col text-text-primary-dark mb-4">
                  <label
                    htmlFor="problem"
                    className={
                      errors.problem && touched.problem ? "text-negative-3" : ""
                    }
                  >
                    Problem
                  </label>
                  <Field
                    type="text"
                    name="problem"
                    className={
                      errors.problem && touched.problem
                        ? classNames.inputError
                        : classNames.input
                    }
                  />
                  <ErrorMessage
                    name="problem"
                    component="div"
                    className="text-negative-3 text-xs"
                  />
                </div>

                <div className="flex flex-col text-text-primary-dark mb-4">
                  <label
                    htmlFor="details"
                    className={
                      errors.details && touched.details ? "text-negative-3" : ""
                    }
                  >
                    Details
                  </label>
                  <Field
                    type="text"
                    name="details"
                    className={
                      errors.details && touched.details
                        ? classNames.inputError
                        : classNames.input
                    }
                  />
                  <ErrorMessage
                    name="details"
                    component="div"
                    className="text-negative-3 text-xs"
                  />
                </div>

                <div className="flex flex-col text-text-primary-dark mb-8">
                  <label
                    htmlFor="type"
                    className={
                      errors.type && touched.type ? "text-negative-3" : ""
                    }
                  >
                    Type
                  </label>
                  <Field
                    component="select"
                    name="type"
                    className={
                      errors.type && touched.type
                        ? classNames.inputError1
                        : classNames.input1
                    }
                  >
                    <option value="Technical">Technical </option>

                    <option value="Financial">Financial</option>

                    <option value="Other">Other</option>
                  </Field>
                </div>
                <div className="flex flex-row flex-end">
                  <button
                    type="submit"
                    onClick={() => handleFormSubmit(values)}
                    className=" ml-auto bg-text-accent-dark px-4 py-2 rounded-md hover:bg-text-active-dark hover:text-white transition duration-200 ease-in-out"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
}

const initialValues = {
  problem: "",
  details: "",
  type: "Technical",
};

const checkoutSchema = yup.object().shape({
  problem: yup.string().required("required"),
  details: yup.string().required("required"),
});
