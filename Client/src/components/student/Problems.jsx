import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { getUser } from '../../apis/users/user-api'
import { useParams } from 'react-router-dom'
import { getCorporateCourses } from '../../apis/corporate-api'
import { getIndividualCourses } from '../../apis/individual-api'
import { CurrentUserContext } from '../../hooks/CurrentUserContext'
import Modal from '../Modal'
import ReportProblem from '../ReportProblem'
import { useRef } from 'react'
import { getUserReports } from '../../apis/problems-api'


const Problems = () => {

    const {id} = useParams()
    const [problems, setProblems] = useState()
    const [user] = useContext(CurrentUserContext)

    useEffect(() => {
        const getReports = async () => {
            
            let res;

            
            res = await getUserReports(user._id)
        

            setProblems(res.data);
            console.log(res.data);

        }

        getReports()


    }, [])

   
  return (
   <>
   
    <div className='mr-4 ml-4 mt-12 w-full'>
        <h1 className='text-text-primary-dark text-3xl font-bold mt-16 mb-12'>My Reports</h1>
        <div              
            className="text-text-primary-dark font-bold py-3 px-4 group border-b border-b-text-nav-primary-dark  mb-2 first:mt-2 flex items-center justify-between mr-5"
        >
            <p>Problem</p>
            <p>Type</p>
            <p>Status</p>
        </div>
        {
        problems?.map((problem, i) => {
                  return (
                    <div
                      key={i}
                      className="text-text-primary-dark py-3 px-4 group border-b border-b-text-nav-primary-dark  mb-2 first:mt-2 flex items-center justify-between mr-5"
                    >
                     <p>{problem.problem}</p>
                     <p>{problem.type}</p>
                     <p>{problem.status}</p>
                    
                    </div>
                  );
                })
        }
    </div>
        
   </>
  )
}

export default Problems