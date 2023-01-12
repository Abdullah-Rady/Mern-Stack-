import { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../../components/Modal";
import { MdSelectAll } from "react-icons/md";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { createPromoCode } from "../../apis/promos-api";
import Toast from "../Toast";
import { isAuthenticated } from "../../apis/auth/auth-helper";
import { listCourses } from "../../apis/courses-api";

const classNames = {
  wrapper: "w-full ml-4",
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

const AddPromo = () => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState();

  const [selected, setSelected] = useState(false);
  const [selectAll, setSelecAll] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState();

  // const handleFormSubmit = async (values) => {
  //   let res;
  //   try {
  //     res = await createPromoCode(values, isAuthenticated());
  //     msg = "Promotion added sucessfully";
  //     setOpen(true);
  //   } catch (error) {
  //     msg = "Error";
  //     setOpen(true);

  //     console.log(error);
  //   }
  // };

  const handleFormSubmit = async (values) => {
    let res;

    if (!selected.some((b) => b)) {
      setError("At least 1 course should be selected");
      return;
    }

    setError("");
    let courseid = [];

    selected.forEach((course, i) => {
      if (course) courseid.push(courses[i]._id);
    });

    try {
      res = await createPromoCode(
        { ...values, courses: courseid },
        isAuthenticated()
      );
      setMsg("Promotion added sucessfully");
      setOpen(true);
    } catch (error) {
      setMsg("Error");
      setOpen(true);
      console.log(error);
    }
  };
  const handelClick = (i) => {
    const updated = [...selected];
    updated[i] = !updated[i];
    setSelected(updated);
  };

  const handelSelectAll = () => {
    if (selectAll) {
      setSelected(Array(courses.length).fill(false));
      setSelecAll(false);
    } else {
      setSelected(Array(courses.length).fill(true));
      setSelecAll(true);
    }
  };

  useEffect(() => {
    let flag = true;
    const fetch = async () => {
      try {
        let res = await listCourses();
        if (res.status === 200 && flag) {
          setCourses(res.data);
          setSelected(Array(res.data.lenght).fill(false));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetch();

    return () => {
      flag = false;
    };
  }, []);

  return (
    <>
      <div className={classNames.wrapper}>
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
                <div className="flex flex-col w-full ml-auto">
                  <div className="flex flex-col mb-8">
                    <div className="flex flex-row mb-4">
                      <div
                        className="text-white ml-6 flex justify-center items-center "
                        onClick={handelSelectAll}
                      >
                        <MdSelectAll />
                      </div>
                      <h2 className="text-text-primary-dark ml-2 font-bold">
                        {" "}
                        Course Name
                      </h2>
                    </div>
                    {courses?.map((course, i) => {
                      return (
                        <div
                          key={i}
                          className="text-text-primary-dark py-3 px-4 group border-b border-b-text-nav-primary-dark  mb-2 first:mt-2 flex items-center justify-between mr-5"
                        >
                          <div className="group-hover:border-b-text-accent-dark">
                            <Field
                              type="checkbox"
                              id={course._id}
                              name="courses"
                              value={course.name}
                              className="ml-2"
                              onChange={() => handelClick(i)}
                              checked={selected[i]}
                            />

                            <label className="ml-2" htmlFor={course._id}>
                              {course.title}
                            </label>
                          </div>
                        </div>
                      );
                    })}

                    <ErrorMessage
                      name="courses"
                      component="div"
                      className="text-negative-3 text-xs"
                    />

                    <div className="text-negative-3 text-xs">{error}</div>
                  </div>
                  <div className="flex flex-row justify-space w-full">
                    <div className="grow mr-5">
                      <label
                        htmlFor="promoCode"
                        className={
                          errors.promoCode && touched.promoCode
                            ? classNames.labelError
                            : classNames.label
                        }
                      >
                        Promotion code
                      </label>

                      <Field
                        type="text"
                        name="promoCode"
                        id="promoCode"
                        className={
                          errors.promoCode && touched.promoCode
                            ? classNames.inputError
                            : classNames.input
                        }
                      />
                      <ErrorMessage
                        name="promoCode"
                        component="div"
                        className="text-negative-3 text-xs"
                      />
                    </div>

                    <div className="grow mr-5">
                      <label
                        htmlFor="discount"
                        className={
                          errors.discount && touched.discount
                            ? classNames.labelError
                            : classNames.label
                        }
                      >
                        Discont
                      </label>

                      <Field
                        type="text"
                        name="discount"
                        id="discount"
                        className={
                          errors.discount && touched.discount
                            ? classNames.inputError
                            : classNames.input
                        }
                      />
                      <ErrorMessage
                        name="discount"
                        component="div"
                        className="text-negative-3 text-xs"
                      />
                    </div>

                    <div className="grow mr-5 mb-8">
                      <label
                        htmlFor="expirationDate"
                        className={
                          errors.expirationDate && touched.expirationDate
                            ? classNames.labelError
                            : classNames.label
                        }
                      >
                        Expiration
                      </label>

                      <DatePickerField
                        className={
                          errors.expirationDate && touched.expirationDate
                            ? classNames.inputError
                            : classNames.input
                        }
                        name="expirationDate"
                        id="expirationDate"
                        value={values.expirationDate}
                        onChange={handleChange}
                        minDate={new Date()}
                        selected={Date.now()}
                      />

                      <ErrorMessage
                        name="expirationDate"
                        component="div"
                        className="text-negative-3 text-xs"
                      />
                    </div>
                    
                  </div>

                  <div className="flex flex-row justify-between items-end w-full">
                    <div></div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-text-accent-dark px-4 py-2 rounded-md hover:bg-text-active-dark hover:text-white transition duration-200 ease-in-out mr-5"
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
          text={msg}
          positionx={0}
          positiony={0}
        />
      )}
    </>
  );
};

const checkoutSchema = yup.object().shape({
  promoCode: yup
    .string()
    .required("required")
    .min(6, "Must be at least 6 characters"),
  expirationDate: yup
    .date()
    .required("required")
    .typeError("please choose a date"),
    discount: yup.string().required("required")
});

const initialValues = {
  promoCode: "",
  expirationDate: "",
  discount: "",
};

const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export default AddPromo;
