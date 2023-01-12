import React from 'react'
import EnrolledCourses from '../../components/student/EnrolledCourses'
import SideBarStudent from '../../components/student/SideBarStudent'

const MyCourses = () => {
  return (
    <div className='bg-s flex flex-row'>
        <SideBarStudent />
        <EnrolledCourses/>
    </div>
  )
}

export default MyCourses