import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    return <ul className='nav-list'>
        <li>
            <Link to="/addDrug">הוסף תרופה לרשימה</Link>
        </li>
        <li>
            <Link to="/">דף הבית</Link>
        </li>
    </ul>
}

export default Navbar