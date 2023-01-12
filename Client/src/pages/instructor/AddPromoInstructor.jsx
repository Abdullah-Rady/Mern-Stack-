import React from 'react'
import SidebarInstructor from '../../components/instructor/SideBarInstructor'
import AddPromoCourse from '../../components/instructor/AddPromoCourse'

const AddPromoInstructor = () => {
  return (
    <div className='flex flex-row w-full h-full bg-s'>
     <SidebarInstructor />
     <AddPromoCourse />
    </div>
  )
}

export default AddPromoInstructor