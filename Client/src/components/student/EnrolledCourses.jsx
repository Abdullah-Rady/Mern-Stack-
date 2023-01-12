import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { getUser } from '../../apis/users/user-api'
import { useParams, Link } from 'react-router-dom'
import { getCorporateCourses } from '../../apis/corporate-api'
import { getIndividualCourses } from '../../apis/individual-api'
import { CurrentUserContext } from '../../hooks/CurrentUserContext'
import ReportProblem from '../ReportProblem'



const EnrolledCourses = () => {

    const {id} = useParams()
    const [courseId, setCourseId] = useState()
    const [courses, setCourses] = useState()
    const [user] = useContext(CurrentUserContext)
    const [problem, setProblem] = useState(false)

    useEffect(() => {
        const getCourses = async () => {
            
            let res;

            if(user.role === 'Corporate Trainee')
                res = await getCorporateCourses(id)
            else
                res = await getIndividualCourses(id)

            setCourses(res.data.user.enrolled_courses);
            console.log(res.data.user.enrolled_courses);

        }

        getCourses()


    }, [])

    const handelReportProblem = (courseid) => {
      setCourseId(courseid)
      setProblem(true)
    }

  return (
   <>
   
    <div className='mr-4 ml-4 mt-12 w-full'>
        <h1 className='text-text-primary-dark text-3xl font-bold mt-24 mb-12'>My Courses</h1>
        {
        courses?.map((course, i) => {
                  return (
                    <div
                      key={i}
                      className="text-text-primary-dark py-3 px-4 group border-b border-b-text-nav-primary-dark  mb-2 first:mt-2 flex items-center justify-between mr-5"
                    >
                     {course.title}
                    <div>

                      <Link to={`/student/${id}/course/${course._id}`} className=' mr-3 px-4 py-2 rounded-md hover:text-white bg-text-accent-dark text-black hover:bg-text-active-dark transition duration-200 ease-in-out' onClick={() => console.log()} >View</Link>
                      <button className='px-4 py-2 rounded-md hover:text-white bg-negative-2 text-black hover:bg-negative-3 transition duration-200 ease-in-out' onClick={() => handelReportProblem(course._id)}>Report Problem</button>
                    </div>
                    </div>
                  );
                })
        }
    </div>
        { problem && <ReportProblem open={problem} onClose= {() => setProblem(false)} userid={id} courseid={courseId}/>}
   </>
  )
}

export default EnrolledCourses