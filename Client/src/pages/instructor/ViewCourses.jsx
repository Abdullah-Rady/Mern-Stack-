import React from 'react'
import MyCourses from '../../components/instructor/MyCourses'
import SidebarInstructor from '../../components/instructor/SideBarInstructor'

const ViewCourses = () => {
  return (
    <>
        <div className='flex flex-row w-full h-full bg-s'>
            <SidebarInstructor />
            <MyCourses />
        </div>
    </>
  )
}

export default ViewCourses