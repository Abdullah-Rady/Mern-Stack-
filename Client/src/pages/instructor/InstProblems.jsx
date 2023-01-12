import React from 'react'
import SidebarInstructor from '../../components/instructor/SideBarInstructor'
import Problems from '../../components/student/Problems'

const InstProblems = () => {
  return (
    <div className='bg-s flex flex-row'>
        <SidebarInstructor />
        <Problems />
    </div>
  )
}

export default InstProblems