import { MdOutlinePlayLesson } from "react-icons/md";
import { BiNote } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect, useCallback } from "react";
import { CurrentUserContext } from "../../hooks/CurrentUserContext";
import { getCourse } from "../../apis/courses-api";
import ExamModal from "./ExamModal";
import { finishCourse } from "../../apis/users/user-api";
import Note from "./Note";


const classNames = {
  wrapper: "min-h-[calc(100vh)] sticky w-1/5 bg-p ",
  innerWrapper: "p-4 mt-4",
  section: "mb-1",
  listHeader: "text-sm text-gray-500 font-semibold text-text-secondary-dark",
  list: "flex flex-col flex-start mt-4",
  listLink: "group rounded-md p-1 text-text-nav-primary-dark",
  listLinkActive: "group rounded-md p-1 text-text-active-dark",
  listItem:
    "group-hover:text-text-active-dark flex flex-row items-center  mt-2",
  listIconDiv: "group-hover:animate-[hover_200ms_ease-in-out]",
  listIcon: "ml-2 mr-2 ",
};

export default function CourseSideBar() {
  const [currentUserContext, login] = useContext(CurrentUserContext);
  const { id, courseid } = useParams();
  const [lessons, setLessons] = useState(false);
  const [lesson, setLesson] = useState(0);
  const [exam, setExam] = useState();
  const [open, setOpen] = useState(false);
  const [opennote, setOpennote] = useState(false);

  useEffect(() => {
    const getCoursee = async () => {
      try {
        let res = await getCourse(courseid);
        setLessons(res.data.lessons);
      } catch (error) {
        console.log(error);
      }
    };

    getCoursee();
  }, []);

  const a = useCallback(
    () => setOpennote(false),
    [])
  

  const finish = async () => {
    try {
      let res = await finishCourse(id);
    } catch (error) {}
  };

  return (
    <div className="flex flex-row w-full h-full bg-s">
      <div className={classNames.wrapper}>
        <div className={classNames.innerWrapper}>
          <div className={classNames.section}>
            <h3 className={classNames.listHeader}>Lessons</h3>
            <ul className={classNames.list}>
              {lessons &&
                lessons.map((lesson, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => setLesson(i)}
                      className={classNames.listLink}
                    >
                      <li className={classNames.listItem}>
                        <div className={classNames.listIconDiv}>
                          <MdOutlinePlayLesson
                            className={classNames.listIcon}
                          />
                        </div>
                        {`Lesson ${i + 1}`}
                      </li>
                    </button>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>

      <div className="h-full w-full bg-s text-text-primary-dark">
        {lessons && lessons[lesson] && (
          <div className="flex flex-col w-full items-center">
            <div className="w-8/12">
              <div className="  flex flex-col items-center w-full px-2 py-3  group transition duration-200 ease-in-out rounded-xl mb-4">
                <h1 className="font-bold mb-4 mt-4">
                  {" "}
                  {lessons[lesson].lesson_name}
                </h1>
                <div className="mr-2 border-2 rounded-lg overflow-clip relative">
                  <iframe
                    //   className="w-full h-full"
                    height="600px"
                    width="1000px"
                    src={
                      lessons[lesson].link
                        ? lessons[lesson].link
                        : "https://www.youtube.com/embed/hPr-Yc92qaY"
                    }
                  ></iframe>
                </div>
                <div className="mt-8">
                  <p className="text-sm text-light mb-2 pr-2">
                    {lessons[lesson].description}
                  </p>
                </div>
              </div>
            </div>
            
            {opennote && <Note onClose={a} open={opennote} />}

            {lesson + 1 == lessons.length ? (
              <button
                onClick={finish}
                className=" mr-3 px-4 py-2 rounded-md hover:text-white bg-text-accent-dark text-black hover:bg-text-active-dark transition duration-200 ease-in-out"
              >
                Finish Course
              </button>
            ) : (
              <div></div>
            )}

            {lessons[lesson].exam.length > 0 ? (
              <button
                onClick={() => setOpen(true)}
                className=" mt-4 mr-3 px-4 py-2 rounded-md hover:text-white bg-text-accent-dark text-black hover:bg-text-active-dark transition duration-200 ease-in-out"
              >
                Take Exam
              </button>
            ) : (
              <div></div>
            )}

            {open && (
              <ExamModal
                open={open}
                onClose={() => setOpen(false)}
                questions={lessons[lesson].exam}
              />
            )}

            

            <button
              className="rounded-full  bg-text-accent-dark absolute text-black hover:text-white hover:bg-text-active-dark transition duration-200 ease-in-out right-16 bottom-16 px-4 py-4 text-4xl"
              onClick={() => setOpennote(true)}
            >
              <BiNote />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
