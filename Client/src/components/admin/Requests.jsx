import React from 'react'
import { useEffect, useState } from 'react'
import { getAllRequests } from '../../apis/requests-api'
import {Link} from "react-router-dom"
import { enrollCourse, reject } from '../../apis/corporate-api'
import Modal from '../Modal'
import Toast from '../Toast'

const Requests = () => {

    const [requests, setRequests] = useState()
    const [req, setReq] = useState(false)
    const [msg, setMsg] = useState("")

    useEffect(() => {
        const fetch = async () => {
            try {
                let res = await getAllRequests()

                if (res.status == 200){
                    setRequests(res.data)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetch()
    }, [])

    const approve = async (user, course) => {

        try {
            
            let res = await enrollCourse({_id: user, courseid: course})
            
            if(res.status == 200) {
                
                setMsg("Approved Successfully")
                setReq(true)
                setTimeout(() =>{
                    setReq(false)
                }, 4000)
                return
            }

            

        } catch (error) {
            console.log(error);
        }
    }


    const reject1 = async (user, course) => {
        try {
            
            let res = await reject({userid: user, courseid: course})
            
            
            if(res.status == 200) {
                
                setMsg("Rejected Successfully")
                setReq(true)
                setTimeout(() =>{
                    setReq(false)
                }, 4000)
                return
            }

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='mr-4 ml-4 mt-12'>
        <h1 className='text-text-primary-dark text-3xl font-bold mt-24 mb-12'>View corporate requests</h1>
        {
        requests?.map((request, i) => {
                  return (
                    <div
                      key={i}
                      className="text-text-primary-dark py-3 px-4 group border-b border-b-text-nav-primary-dark  mb-2 first:mt-2 flex items-center justify-between mr-5"
                    >
                     

                     <div>   
                        {
                            `${request.name} is requesting access to `
                        }
                        <Link to={`/course/${request.courseid}` } className="underline hover:text-blue-700">{request.course}</Link>
                    </div>
                    <div>

                      <button className=' mr-3 px-4 py-2 rounded-md hover:text-white bg-text-accent-dark text-black hover:bg-text-active-dark transition duration-200 ease-in-out' onClick={() => approve(request.userid, request.courseid)} >Approve</button>
                      <button className='px-4 py-2 rounded-md hover:text-white bg-text-accent-dark text-black hover:bg-text-active-dark  transition duration-200 ease-in-out' onClick={() => reject1(request.userid, request.courseid)}>Reject</button>
                    </div>
                    </div>
                  );
                })
        }
        { req && <Toast  onClose={() => setReq(false)} text={msg} positionx={0} positiony={0}/>}
    </div>
  )
}

export default Requests