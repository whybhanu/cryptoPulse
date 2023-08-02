import React from 'react'
import {IoMdPulse} from 'react-icons/io'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (
    <>
      <Link to={'/'}>
        <div className="navbar">
          <IoMdPulse className='icon'/>
          <h1>Crypto<span className='purple'>Pulse</span></h1>
        </div>
      </Link>
    </>
  )
}

export default Navbar