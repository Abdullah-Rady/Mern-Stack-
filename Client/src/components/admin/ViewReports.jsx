import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { BsEye, BsEyeSlash} from "react-icons/bs"

import { useParams } from 'react-router-dom'


import { getAllReports, makeSeen } from '../../apis/problems-api'
import ViewReport from './ViewReport'


const ViewReports = () => {

    const [problems, setProblems] = useState()
    const [open, setOpen]= useState(false)
    const [details, setDetails]= useState()
    const [id, setId]= useState()

    useEffect(() => {
        const getReports = async () => {
            
            let res;

            
            res = await getAllReports()
        

            setProblems(res.data);
        }

        getReports()


    }, [])

    const handelClick = (id, details) => {
      makeSeen(id)
      setOpen(true)
      setId(id)
      setDetails(details)
    }
   
  return (
   <>
   
    <div className='mr-4 ml-4 mt-12 w-full'>
        
        <div              
            className="text-text-primary-dark font-bold py-3 px-4 group border-b border-b-text-nav-primary-dark  mb-2 first:mt-2 flex items-center justify-between mr-5"
        >
            
            <div className='flex-1 flex flex-row  items-center'>
                     <p>Problem</p>
                      
                      <p className='ml-4'></p>
            </div>
            <p className='flex-1'>Type</p>
            <p className='flex-1'>Status</p>
            <p className='flex-1'>Action</p>
            <p className='flex-1'></p>
        </div>
        {
        problems?.map((problem, i) => {
                  return (
                    <div
                      key={i}
                      className="text-text-primary-dark py-3 px-4 group border-b border-b-text-nav-primary-dark  mb-2 first:mt-2 flex items-center justify-between mr-5"
                    >
                     
                     <div className='flex-1 flex flex-row  items-center'>
                     <p>{!problem.seen ? <BsEyeSlash /> : <BsEye />}</p>
                      
                      <p className='ml-4'>{problem.problem}</p>
                      </div>
                     <p className='flex-1'>{problem.type}</p>
                     <p className='flex-1'>{problem.status}</p>
                     <p className='flex-1'>{problem.status}</p>
                     <button onClick={() => handelClick(problem._id, problem.details)} className="rounded-md  bg-text-accent-dark text-black py-2 px-4 flex-1 hover:bg-text-active-dark hover:text-white duration-200 transition ease-in-out">View</button>
                    
                    </div>
                  );
                })
        }
    </div>
        {open && <ViewReport open={open} onClose={()=> setOpen(false)} details={details} id={id}/>}
   </>
  )
}

export default ViewReports