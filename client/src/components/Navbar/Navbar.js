import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../asset/logo.jpg'
import './Navbar.css'

const Navbar = () => {

  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  }

  return (
    <div className='nav'>
      <img className='logo' src={logo} alt="logo" />
      <div className='links'>
          <Link className='order' to="/">Home</Link>
          <Link className='order' to="/menu">Menu</Link>
          <Link className='menu' onMouseEnter={toggle} onMouseLeave={toggle}>Login/Signup
            {show && (
              <div className='drop'>
                <Link className='menu-item' to="/auth/user">As User</Link>
                <Link className='menu-item' to="/auth/staff">As Staff</Link>
              </div>
            )}
          </Link>
      </div>
    </div>
  )
}

export default Navbar
