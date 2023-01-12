import { useState } from "react";
import { createCourse } from "../../apis/courses-api";
import Modal from "../../components/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import {isAuthenticated} from "../../apis/auth/auth-helper"
import Toast from "../../components/Toast"
const classNames = {
  wrapper: "w-full pl-4 bg-s",
  inputGroup: "flex flex-row pb-4",
  input:
    " bg-i block w-full appearance-none rounded-tl-md rounded-tr-md px-3 py-2 text-text-primary-dark placeholder-gray-500  border-b border-p focus:border-ib transition duration-200 ease-in-out focus:outline-none focus:ring-black sm:text-sm ",
  inputError:
    "bg-i block w-full appearance-none rounded-tl-md rounded-tr-md px-3 py-2 text-text-primary-dark placeholder-gray-500 border-b-2 border-negative-3  focus:outline-none focus:ring-black sm:text-sm",
  labelError: " block mb-2 text-sm font-medium text-negative-3",
  label: "block mb-2 text-sm font-medium text-text-primary-dark",
  inputSuccess:
    "bg-i block w-full appearance-none rounded-tl-md rounded-tr-md px-3 py-2 text-text-primary-dark placeholder-gray-500  focus:border-black focus:outline-none focus:ring-black sm:text-sm",
  submitButton:
    "group relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
  overlay:
    "fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full",
};

const AddCourse = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleFormSubmit = async (values) => {
    console.log(values);
    let res;
    try {
      res = await createCourse(values, isAuthenticated());
      if (res.status == 200) setOpen(true);
    } catch (error) {
      setMsg(error);
    }
  };

  return (
    <>
      <div className={classNames.wrapper}>
        <h1 className="text-text-primary-dark text-2xl mt-16 mb-12 font-bold">Add a course</h1>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <Form>
                <div className="flex flex-wrap flex-row w-full ml-auto">
                  <div className="flex flex-row justify-space w-full">
                    <div className="grow mr-5">
                      <label
                        htmlFor="title"
                        className={
                          errors.title && touched.title
                            ? classNames.labelError
                            : classNames.label
                        }
                      >
                        Title
                      </label>

                      <Field
                        type="text"
                        name="title"
                        id="title"
                        className={
                          errors.title && touched.title
                            ? classNames.inputError
                            : classNames.input
                        }
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-negative-3 text-xs"
                      />
                    </div>

                    <div className="grow mr-5 mb-8">
                      <label
                        htmlFor="subject"
                        className={
                          errors.subject && touched.subject
                            ? classNames.labelError
                            : classNames.label
                        }
                      >
                        Subject
                      </label>

                      <Field
                        type="text"
                        name="subject"
                        id="subject"
                        className={
                          errors.subject && touched.subject
                            ? classNames.inputError
                            : classNames.input
                        }
                      />
                      <ErrorMessage
                        name="subject"
                        component="div"
                        className="text-negative-3 text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-space w-full">
                    <div className="flex flex-row justify-space w-full">
                      <div className="grow mr-5">
                        <label
                          htmlFor="hours"
                          className={
                            errors.hours && touched.hours
                              ? classNames.labelError
                              : classNames.label
                          }
                        >
                          Hours
                        </label>

                        <Field
                          type="number"
                          name="hours"
                          id="hours"
                          className={
                            errors.hours && touched.hours
                              ? classNames.inputError
                              : classNames.input
                          }
                        />
                        <ErrorMessage
                          name="hours"
                          component="div"
                          className="text-negative-3 text-xs"
                        />
                      </div>

                      <div className="grow mr-5 mb-8">
                        <label
                          htmlFor="price"
                          className={
                            errors.price && touched.price
                              ? classNames.labelError
                              : classNames.label
                          }
                        >
                          Price
                        </label>

                        <Field
                          type="number"
                          name="price"
                          id="price"
                          className={
                            errors.price && touched.price
                              ? classNames.inputError
                              : classNames.input
                          }
                        />
                        <ErrorMessage
                          name="price"
                          component="div"
                          className="text-negative-3 text-xs"
                        />
                      </div>
                    </div>

                  </div>
                  <div className="grow mr-5 mb-8">
                      <label
                        htmlFor="img"
                        className={
                          errors.img && touched.img
                            ? classNames.labelError
                            : classNames.label
                        }
                      >
                        Image Link
                      </label>

                      <Field
                        type="text"
                        name="img"
                        id="img"
                        className={
                          errors.img && touched.img
                            ? classNames.inputError
                            : classNames.input
                        }
                      />
                      <ErrorMessage
                        name="img"
                        component="div"
                        className="text-negative-3 text-xs"
                      />
                    </div>
                    <div className="flex flex-row justify-between items-end w-full">
                    <div className="grow mr-5 mb-8">
                        <label
                            htmlFor="preview"
                            className={
                                errors.preview && touched.preview
                            ? classNames.labelError
                            : classNames.label
                            }
                            >
                            Preview
                        </label>

                        <Field
                            type="text"
                            name="preview"
                            id="preview"
                            className={
                                errors.preview && touched.preview
                            ? classNames.inputError
                            : classNames.input
                            }
                        />
                        <ErrorMessage
                            name="preview"
                            component="div"
                            className="text-negative-3 text-xs"
                        />
                    </div>
                    <div className="grow mr-5 mb-8">
                      <label
                        htmlFor="description"
                        className={
                          errors.description && touched.description
                            ? classNames.labelError
                            : classNames.label
                        }
                      >
                        Description
                      </label>

                      <Field
                        type="text"
                        name="description"
                        id="description"
                        className={
                          errors.description && touched.description
                            ? classNames.inputError
                            : classNames.input
                        }
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-negative-3 text-xs"
                      />
                    </div>
                    </div>
                  <div className="flex flex-row justify-between items-end w-full ">

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className=" ml-auto bg-text-accent-dark px-4 py-2 rounded-md hover:bg-text-active-dark hover:text-white transition duration-200 ease-in-out mr-5"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
      {open && (
        <Toast
          onClose={() => setOpen(false)}
          text={"Course added sucessfully"}
          positionx={0}
          positiony={0}
        />
      )}
      {error && (
        <Toast
          onClose={() => setOpen(false)}
          text={msg}
          positionx={0}
          positiony={0}
        />
      )}
    </>
  );
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  subject: yup.string().required("required"),
  price: yup.number().required("required"),
  hours: yup.number().required("required"),
  img: yup.string().required("required"),
    preview: yup.string().required("required"),
    description: yup.string().required("required"),
});

const initialValues = {
  title: "",
  subject: "",
  price: 0,
  hours: 0,
  img: "",
  subtitles: "",
    preview:"",
    description: "",

};

export default AddCourse;
