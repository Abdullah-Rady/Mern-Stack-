import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { addLesson } from "../../apis/courses-api";
import { Formik, Form, Field, ErrorMessage, } from "formik";
import * as yup from "yup";
import { isAuthenticated } from "../../apis/auth/auth-helper";
import Toast from "../Toast";

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

const Addlesson = () => {
  const { id, courseid } = useParams();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  
  const handleFromSubmit = async (values) => {

    try {
      let res = await addLesson(isAuthenticated(), courseid, values);
      if (res.status == 200){
        setMsg("Added successfully")
        setOpen(true);
      }
        

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
    <Formik
      onSubmit={handleFromSubmit}
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
        <div className={classNames.wrapper}>
          <h1 className="text-text-primary-dark text-2xl mt-16 mb-12 font-bold">
            Add a Lessons
          </h1>
          <Form>
            <div className="flex flex-wrap flex-row w-full ml-auto">
              <div className="w-full mb-4 mr-4">
                <label
                  htmlFor="lesson_name"
                  className={
                    errors.lesson_name && touched.lesson_name
                    ? classNames.labelError
                    : classNames.label
                  }
                  >
                  Lesson name
                </label>

                <Field
                  type="text"
                  name="lesson_name"
                  id="lesson_name"
                  className={
                    errors.lesson_name && touched.lesson_name
                    ? classNames.inputError
                    : classNames.input
                  }
                  />
                <ErrorMessage
                  name="lesson_name"
                  component="div"
                  className="text-negative-3 text-xs"
                  />
              </div>
              <div className="w-full mb-4 mr-4">
                <label
                  htmlFor="link"
                  className={
                    errors.link && touched.link
                    ? classNames.labelError
                    : classNames.label
                  }
                  >
                  Link
                </label>

                <Field
                  type="text"
                  name="link"
                  id="link"
                  className={
                    errors.link && touched.link
                    ? classNames.inputError
                    : classNames.input
                  }
                  />
                <ErrorMessage
                  name="link"
                  component="div"
                  className="text-negative-3 text-xs"
                  />
              </div>
              <div className="w-full mb-4 mr-4">
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

             
              
              

              <button
                type="submit"
                disabled={isSubmitting}
                className=" w-full bg-text-accent-dark px-4 py-2 rounded-md hover:bg-text-active-dark hover:text-white transition duration-200 ease-in-out mr-5 "
                >
                Submit
              </button>
            </div>
          </Form>
        </div>
        
        )}
    </Formik>
    {open && <Toast onClose={() => setOpen(false)} text={msg} positionx={0} positiony={0}/> }
  </>
  );
};

export default Addlesson;

const initialValues = {
  lesson_name: "",
  link: "",
  description: "",
};

const checkoutSchema = yup.object().shape({
  lesson_name: yup.string().required("required"),
  
  link: yup
  .string()
  .matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Enter correct url"
    )
    .required("required"),

  description: yup.string().required("required"),
});


