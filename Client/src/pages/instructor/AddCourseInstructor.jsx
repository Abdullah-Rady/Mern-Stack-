import React from 'react'
import AddCourse from '../../components/instructor/AddCourse'
import SidebarInstructor from '../../components/instructor/SideBarInstructor'

const AddCourseInstructor = () => {
  return (
    <div className='flex flex-row'>
        <SidebarInstructor />
        <AddCourse />
    </div>
  )
}

export default AddCourseInstructor