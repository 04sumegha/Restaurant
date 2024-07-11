import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../asset/logo.jpg'
import './Navbar.css'

const Navbar = () => {

  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("cookies");
    if(token !== ""){
      setLoggedIn(true);
    }
  }, [])

  const deleteCookies = () => {
    window.localStorage.setItem("cookies", "");
    window.localStorage.setItem("email", "");
    window.localStorage.setItem("userId", "");
    window.localStorage.setItem("staffId", "");
    setLoggedIn(false);
  }

  const toggle = () => {
    setShow(!show);
  }

  return (
    <div className='nav'>
      <img className='logo' src={logo} alt="logo" />
      <div className='links'>
          <Link className='order' to="/">Home</Link>
          <Link className='order' to="/menu">Menu</Link>
          {!loggedIn && (
            <Link className='menu' onMouseEnter={toggle} onMouseLeave={toggle}>Login/Signup
            {show && (
              <div className='drop'>
                <Link className='menu-item' to="/auth/user">As User</Link>
                <Link className='menu-item' to="/auth/staff">As Staff</Link>
              </div>
            )}
            </Link>
          )}
          {loggedIn && (
            <Link className='menu' onClick={deleteCookies} to="/">Logout</Link>
          )}
      </div>
    </div>
  )
}

export default Navbar
