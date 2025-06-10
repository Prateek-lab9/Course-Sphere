import React from 'react'
import logo from "../assets/logo.png"
import {Link} from 'react-router-dom'
function Navbar(props) {
  return (
    <div className=' flex md:justify-between w-full bg-transparent py-6 items-center'>
      
      <div className='hidden md:flex items-center gap-2 '><img className='w-10' src={logo} alt="" />
     <span className='text-orange-500 text-2xl font-semibold'>CourseSphere</span></div>
      <div className='flex md:justify-end w-full justify-center gap-4'>
        <Link to={props.to1} className='border border-white rounded-md px-4 py-2 hover:bg-white hover:translate-y-1 transition-all duration-200 hover:text-black'>{props.btn1}</Link>
        <Link to={props.to2} className='border border-white rounded-md px-4 py-2  hover:bg-white hover:translate-y-1 transition-all duration-200 hover:text-black'>{props.btn2}</Link>
      </div>
    </div>
  )
}

export default Navbar