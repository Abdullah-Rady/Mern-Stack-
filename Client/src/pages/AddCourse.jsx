import { createCourse } from "../apis/courses-api";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

const classNames = {
  wrapper: "w-[20%] flex flex-col justify-center content-center",
  inputGroup: "flex flex-row pb-4",
  input:
    " block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ",
  submitButton:
    "group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
  overlay:
    "fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full",
};

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    hours: "",
    price: "",
    subject: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setCourse((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    let res;
    try {
      res = await createCourse(course);

      console.log(res);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-full ">
      <h2 className="mt-6 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Add a course
      </h2>
      <div className={classNames.wrapper}>
        <div className={classNames.inputGroup}>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Title"
            className={classNames.input}
            onChange={handleChange}
          />
        </div>
        <div className={classNames.inputGroup}>
          <label htmlFor="hours" className="sr-only">
            Hours
          </label>
          <input
            id="hours"
            name="hours"
            type="text"
            required
            placeholder="Number of hours"
            className={classNames.input}
            onChange={handleChange}
          />
        </div>
        <div className={classNames.inputGroup}>
          <label htmlFor="price" className="sr-only">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            required
            placeholder="Price"
            className={classNames.input}
            onChange={handleChange}
          />
        </div>
        <div className={classNames.inputGroup}>
          <label htmlFor="subject" className="sr-only">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="Subject"
            className={classNames.input}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            type="submit"
            className={classNames.submitButton}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        Hello world!
      </Modal>
    </div>
  );
};

export default AddCourse;
