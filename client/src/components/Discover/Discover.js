import React from 'react'
import { Link } from 'react-router-dom'
import './Discover.css'
import paneertikka from '../../asset/itemImages/paneertikka.jpg'
import vegburger from '../../asset/itemImages/vegburger.jpg'
import vegpantrysandwich from '../../asset/itemImages/vegpantrysandwich.jpg'
import creamoftomato from '../../asset/itemImages/creamoftomato.jpg'
import cheeseomelete from '../../asset/itemImages/cheeseomelete.jpg'

const Discover = () => {
  return (
    <div className='discover'>
      <div className='head'>
        <h2>Discover our menu</h2>
      </div>
      <div className='box'>
        <img src={paneertikka} alt="paneertikka" />
        <img src={vegburger} alt="vegburger" />
        <img src={vegpantrysandwich} alt="vegpantrysandwich" />
        <img src={creamoftomato} alt="creamoftomato" />
        <img src={cheeseomelete} alt="cheeseomelete" />
      </div>
      <p>Browse Our Complete Menu and Place Your Order Now!!!!!</p>
      <Link className='menu-link' to="/menu">Browse Menu</Link>
    </div>
  )
}

export default Discover