import { useState } from "react";
import { createAdmin } from "../../apis/admins-api";
import { createInstructor } from "../../apis/instructors-api";
import { createCorporate } from "../../apis/corporate-api";
import Modal from "../../components/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { isAuthenticated } from "../../apis/auth/auth-helper";
import * as yup from "yup";

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

const AddUser = () => {
  const [open, setOpen] = useState(false);

  const handleFormSubmit = async (values) => {
    let res;
    try {
      if (values.role == "Admin")
        res = await createAdmin(values, isAuthenticated());
      else if (values.role == "Instructor") {
        console.log("re");
        res = await createInstructor(values, isAuthenticated());
      } else {
        res = await createCorporate(values, isAuthenticated());
      }
      console.log(res);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

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
                <div className="flex flex-wrap flex-row w-full ml-auto">
                  <div className="flex flex-row justify-space w-full">
                    <div className="grow mr-5">
                      <label
                        htmlFor="first_name"
                        className={
                          errors.first_name && touched.first_name
                            ? classNames.labelError
                            : classNames.label
                        }
                      >
                        First name
                      </label>

                      <Field
                        type="text"
                        name="first_name"
                        id="first_name"
                        className={
                          errors.first_name && touched.first_name
                            ? classNames.inputError
                            : classNames.input
                        }
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-negative-3 text-xs"
                      />
                    </div>

                    <div className="grow mr-5 mb-8">
                      <label
                        htmlFor="last_name"
                        className={
                          errors.last_name && touched.last_name
                            ? classNames.labelError
                            : classNames.label
                        }
                      >
                        Last name
                      </label>

                      <Field
                        type="text"
                        name="last_name"
                        id="last_name"
                        className={
                          errors.last_name && touched.last_name
                            ? classNames.inputError
                            : classNames.input
                        }
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-negative-3 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row justify-space w-full">
                    <div className="grow mr-5 mb-8">
                      <label
                        htmlFor="email"
                        className={
                          errors.email && touched.email
                            ? classNames.labelError
                            : classNames.label
                        }
                      >
                        Email
                      </label>

                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={
                          errors.email && touched.email
                            ? classNames.inputError
                            : classNames.input
                        }
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-negative-3 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row justify-space w-full">
                    <div className="grow mr-5 mb-8">
                      <label
                        htmlFor="username"
                        className={
                          errors.username && touched.username
                            ? classNames.labelError
                            : classNames.label
                        }
                      >
                        Username
                      </label>

                      <Field
                        type="text"
                        name="username"
                        id="username"
                        className={
                          errors.username && touched.username
                            ? classNames.inputError
                            : classNames.input
                        }
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-negative-3 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row justify-space w-full">
                    <div className="grow mr-5 mb-8">
                      <label
                        htmlFor="password"
                        className={
                          errors.password && touched.password
                            ? classNames.labelError
                            : classNames.label
                        }
                      >
                        Password
                      </label>

                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className={
                          errors.password && touched.password
                            ? classNames.inputError
                            : classNames.input
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-negative-3 text-xs"
                      />
                    </div>
                  </div>

                  {/* <div className="flex flex-row justify-space w-full">
                    <div classNames="grow">
                      <label
                        for="password"
                        className="block mb-2 text-sm font-medium text-text-primary-dark"
                      >
                        Password
                      </label>

                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className={classNames.input}
                      />
                      <ErrorMessage name="password" component="div" />
                    </div>
                  </div> */}
                  <div className="flex flex-row justify-between items-end w-full">
                    <div>
                      <label htmlFor="role" className={classNames.label}>
                        Role
                      </label>

                      <Field
                        id="role"
                        name="role"
                        as="select"
                        className={classNames.input}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Corporate Trainee">
                          Corporate Trainee
                        </option>
                      </Field>
                    </div>
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
      <Modal open={open} onClose={() => setOpen(false)}>
        Hello world!
      </Modal>
    </>
  );
};

const passwordRegExp = /.{8,}$/;

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  username: yup.string().required("required"),
  password: yup
    .string()
    .matches(passwordRegExp, "Weak Password")
    .required("required"),
  email: yup.string().email("invalid email").required("required"),
});

const initialValues = {
  email: "",
  first_name: "",
  last_name: "",
  username: "",
  password: "",
  role: "Admin",
};

export default AddUser;
