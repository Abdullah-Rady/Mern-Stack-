import React, { useState, useEffect, useMemo } from "react";
import { addExam, addLesson } from "../../apis/courses-api";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  getIn,
  useFormik,
  useFormikContext,
} from "formik";
import {useParams} from "react-router-dom"
import * as yup from "yup";
import Toast from "../Toast";
import { isAuthenticated } from "../../apis/auth/auth-helper";

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
    "group mt-8 mb-8 relative flex w-full justify-center rounded-md border border-transparent bg-text-accent-dark py-2 px-4 text-sm font-medium text-black hover:bg-text-active-dark hover:text-white transition druation-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
  overlay:
    "fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full",
  submitButton1:
    "group mt-8 relative flex w-full justify-center rounded-md border border-transparent bg-negative-2 py-2 px-4 text-sm font-medium text-black hover:bg-negative-3 hover:text-white transition druation-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
};

const AddExam = () => {

  const {courseid} = useParams()
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState("")

  // const {} = useFormikContext()

  const handleFromSubmit1 = async (values) => {
      
      
      let a = values.questionText.map((question, i)=> {
          
        let q1 = {
          answerText: values.answerText[`${i}1`],
          isCorrect: values.answerOtion[i] === "1" ? true : false 
        }
        let q2 = {
          answerText: values.answerText[`${i}2`],
          isCorrect: values.answerOtion[i] === "2" ? true : false 
        }
        let q3 = {
          answerText: values.answerText[`${i}3`],
          isCorrect: values.answerOtion[i] === "3" ? true : false 
        }
        let q4 = {
          answerText: values.answerText[`${i}4`],
          isCorrect: values.answerOtion[i] === "4" ? true : false 
        }
        return {
          questionText: question,
          answerOptions: [  q1, q2, q3, q4 ]

        }
      })

    try {
      let res = await addExam(isAuthenticated(), courseid, {exam: a, lesson: parseInt(values.lesson) - 1});
      if(res.status == 200){
        setOpen(true)
        setMsg("Exam added successfully")
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Formik
      onSubmit={handleFromSubmit1}
      initialValues={initialValues1}
      validationSchema={checkoutSchema1}
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
            Add a Exam
          </h1>
          <Form>
            <div className="flex flex-wrap flex-row w-full ml-auto">
              <FieldArray
                name="questionText"
                render={(arrayHelpers) => (
                  <div className="w-full h-full mr-4">
                    {values.questionText && values.questionText.length > 0 ? (
                      <>
                      <div className="mb-8">

                      <label
                            htmlFor={`lesson`}
                            className={
                              errors.lesson &&
                              touched.lesson &&
                              errors.lesson &&
                              touched.lesson
                              ? classNames.labelError
                              : classNames.label
                            }
                            >Lesson number</label>
                      <Field
                            type="text"
                            name={`lesson`}
                            id={`lesson`}
                            className={
                              errors.lesson &&
                              touched.lesson &&
                              errors.lesson &&
                              touched.lesson
                              ? classNames.inputError
                              : classNames.input
                            }
                            />
                            <div className={classNames.labelError}>
                            <ErrorMessage name={`lesson`} />
                          </div>
                            </div>
                      {
                      values.questionText.map((friend, index) => (
                        <div key={index} className="mb-12">
                          <label
                            htmlFor={`questionText.${index}`}
                            className={
                              errors.questionText &&
                              touched.questionText &&
                              errors.questionText[index] &&
                              touched.questionText[index]
                              ? classNames.labelError
                              : classNames.label
                            }
                            >{`Question ${index + 1}`}</label>
                          <Field
                            type="text"
                            name={`questionText.${index}`}
                            id={`questionText.${index}`}
                            className={
                              errors.questionText &&
                              touched.questionText &&
                              errors.questionText[index] &&
                              touched.questionText[index]
                              ? classNames.inputError
                              : classNames.input
                            }
                            />
                          
                          <div className={classNames.labelError}>
                            <ErrorMessage name={`questionText.${index}`} />
                          </div>

                          <div className="flex flex-row flex-wrap mt-4">
                            <div className="w-full flex flex-row gap-4">
                              <div className="flex flex-col grow ">
                                <label
                                  htmlFor={`answerText.${index}1`}
                                  className={
                                    // errors.questionText && touched.questionText
                                    false
                                    ? classNames.labelError
                                    : classNames.label
                                  }
                                  >{`Answer 1`}</label>
                                <div className="flex flex-row">
                                  <Field
                                    type="text"
                                    name={`answerText.${index}1`}
                                    id={`answerText.${index}1`}
                                    className={
                                      // errors.questionText && touched.questionText
                                      false
                                      ? classNames.inputError
                                      : classNames.input
                                    }
                                    />
                                  <Field
                                    type="radio"
                                    className="ml-2"
                                    name={`answerOtion.${index}`}
                                    id={`answerOtion.${index}`}
                                    value="1"
                                    
                                    />
                                </div>
                                {/* <ErrorMessage name={`answerText.${index}1`} /> */}
                              </div>
                              <div className="flex flex-col grow ">
                                <label
                                  htmlFor={`answerText.${index}2`}
                                  className={
                                    // errors.questionText && touched.questionText
                                    false
                                    ? classNames.labelError
                                    : classNames.label
                                  }
                                  >{`Answer 2`}</label>
                                <div className="flex flex-row">
                                  <Field
                                    type="text"
                                    name={`answerText.${index}2`}
                                    id={`answerText.${index}2`}
                                    className={
                                      // errors.questionText && touched.questionText
                                      false
                                      ? classNames.inputError
                                      : classNames.input
                                    }
                                    />
                                  <Field
                                    type="radio"
                                    className="ml-2"
                                    name={`answerOtion.${index}`}
                                    id={`answerOtion.${index}`}
                                    value="2"
                                    
                                    />
                                </div>
                                {/* <ErrorMessage name={`answerText.${index}2`} /> */}
                              </div>
                            </div>
                            <div className="w-full flex flex-row mt-4 gap-4">
                              <div className="flex flex-col grow">
                                <label
                                  htmlFor={`answerText.${index}3`}
                                  className={
                                    // errors.questionText && touched.questionText
                                    false
                                    ? classNames.labelError
                                    : classNames.label
                                  }
                                  >{`Answer 3`}</label>
                                <div className="flex flex-row">
                                  <Field
                                    type="text"
                                    name={`answerText.${index}3`}
                                    id={`answerText.${index}3`}
                                    className={
                                      // errors.questionText && touched.questionText
                                      false
                                      ? classNames.inputError
                                      : classNames.input
                                    }
                                    />
                                  <Field
                                    type="radio"
                                    className="ml-2"
                                    name={`answerOtion.${index}`}
                                    id={`answerOtion.${index}`}
                                    value="3"
                                    
                                    />
                                </div>
                                {/* <ErrorMessage name={`answerText.${index}3`} /> */}
                              </div>
                              <div className="flex flex-col grow">
                                <label
                                  htmlFor={`answerText.${index}4`}
                                  className={
                                    // errors.questionText && touched.questionText
                                    false
                                    ? classNames.labelError
                                    : classNames.label
                                  }
                                  >{`Answer 4`}</label>
                                <div className="flex flex-row">
                                  <Field
                                    type="text"
                                    name={`answerText.${index}4`}
                                    id={`answerText.${index}4`}
                                    className={
                                      // errors.questionText && touched.questionText
                                      false
                                      ? classNames.inputError
                                      : classNames.input
                                    }
                                    />
                                  <Field
                                    type="radio"
                                    className="ml-2"
                                    name={`answerOtion.${index}`}
                                    id={`answerOtion.${index}`}
                                    value="4"
                                    
                                    />
                                </div>
                                {/* <ErrorMessage name={`answerText.${index}4`} /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                                  }</>
                    ) : (
                      <div></div>
                    )}
                    {values.questionText.length > 0 && (
                      <button
                        className={classNames.submitButton1}
                        type="button"
                        onClick={() =>
                          arrayHelpers.remove(arrayHelpers.length - 1)
                        }
                      >
                        Remove a question
                      </button>
                    )}
                    <button
                      className={classNames.submitButton}
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                    >
                      Add a question
                    </button>

                    <div>
                      {values.questionText.length > 0 && (
                        <button
                          className={classNames.submitButton}
                          type="submit"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
    {open && <Toast text={msg} positionx={0} positiony={0} onClose={() => setOpen(false)}/>}
  </>
  );
};

export default AddExam;

const ErrorMessage = ({ name }) => (
  <Field name={name}>
    {({ form }) => {
      const error = getIn(form.errors, name);

      const touch = getIn(form.touched, name);

      return touch && error ? error : null;
    }}
  </Field>
);

const initialValues1 = {
  questions: 1,
  questionText: [],
  lesson: 0,
  answerText: {},
  answerOtion: {}
};

const checkoutSchema1 = yup.object().shape({
  questionText: yup.array().of(yup.string().required("required")),
  lesson: yup.number("Must be a number").required("required").min(1)
});
