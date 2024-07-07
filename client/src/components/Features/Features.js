import React from 'react'
import './Features.css'
import feature1 from '../../asset/features/feature1.jpg'
import feature2 from '../../asset/features/feature2.jpg'
import feature3 from '../../asset/features/feature3.jpg'

const Features = () => {
    return (
        <div>
            <div className='left'>
                <img className='img1' src={feature1} alt="feature1" />
                <img className='img2' src={feature2} alt="feature2" />
                <img className='img3' src={feature3} alt="feature3" />
            </div>
            <div className='right'>
                <h2>Our Features</h2>
                <ul>
                    <li>Exquisite Cuisine</li>
                    <li>Cozy and Elegant Dining Environment</li>
                    <li>Friendly and Proffesional Staff</li>
                    <li>Private Dining for Special Occassions</li>
                    <li>Live Music Events</li>
                    <li>Centrally Located with Ample Parking Space</li>
                </ul>
            </div>
        </div>
    )
}
export default Features