import React from 'react'
import Problems from '../../components/student/Problems'
import SideBarStudent from '../../components/student/SideBarStudent'

const MyProblems = () => {
  return (
    <div className='bg-s flex flex-row'>
        <SideBarStudent />
        <Problems />
    </div>
  )
}

export default MyProblems