import React from 'react'
import './Footer.css'
import {FaFacebook, FaInstagram, FaTwitter, FaGooglePlus, FaYoutube} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='icons'>
        <FaFacebook className='icon'/>
        <FaInstagram className='icon'/>
        <FaTwitter className='icon'/>
        <FaGooglePlus className='icon'/>
        <FaYoutube className='icon'/>
      </div>
      <div className='text'>
        <ul>
            <li>Home</li>
            <li>News</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Our Team</li>
        </ul>
      </div>
      <div className='copyright'>
        <p>Copyright &copy; 2024</p>
      </div>
    </div>
  )
}

export default Footer
