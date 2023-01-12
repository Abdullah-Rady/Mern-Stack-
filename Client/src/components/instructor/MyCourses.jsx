import React, { useState, useEffect, useContext } from "react";
import { instructorCourses } from "../../apis/courses-api";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../hooks/CurrentUserContext";
import ReportProblem from '../ReportProblem'

const MyCourses = () => {
  
  const [user] = useContext(CurrentUserContext)
  const [courses, setCourses] = useState();
  const [problem, setProblem] = useState(false)
  const [courseId, setCourseId] = useState()

  
  useEffect(() => {
    let flag = true;
    const fetch = async () => {
      try {
        let res = await instructorCourses(user._id);
        if (res.status === 200 && flag) {
          setCourses(res.data);
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

  const handelReportProblem = (courseid) => {
    setCourseId(courseid)
    setProblem(true)
  }

  return (
    <div className=" w-full h-full flex flex-col justify-center ml-4">
      <h1 className="text-2xl font-bold text-text-primary-dark mb-12 mt-16 ml-4">My Courses</h1>
      <div className="w-full p-4">
        {courses?.map((course, i) => {
          return (
            <div key={i} className="text-text-primary-dark py-3 px-4 group border-b border-b-text-nav-primary-dark  mb-2 first:mt-2 flex items-center justify-between">
              <div className="group-hover:border-b-text-accent-dark">
                
                <p className="ml-2" htmlFor={course._id}>
                  {course.title}
                </p>
              </div>

              <div>

              <Link to={`/instructor/${user._id}/addexam/${course._id}`} className="ml-2 px-3 rounded-md py-1  bg-text-accent-dark text-black hover:bg-text-active-dark transition duration-200 ease-in-out ">
                Add exam
              </Link>
              <Link to={`/instructor/${user._id}/addlesson/${course._id}`} className="ml-2 px-3 rounded-md py-1  bg-text-accent-dark text-black hover:bg-text-active-dark transition duration-200 ease-in-out ">
                Add lesson
              </Link>
              <button className='px-3 py-1 ml-2 rounded-md hover:text-white bg-negative-2 text-black hover:bg-negative-3 transition duration-200 ease-in-out' onClick={() => handelReportProblem(course._id)}>Report Problem</button>

              </div>
            </div>
          );
        })}
      </div>
      { problem && <ReportProblem open={problem} onClose= {() => setProblem(false)} userid={user._id} courseid={courseId}/>}

    </div>
  );
};

export default MyCourses;
