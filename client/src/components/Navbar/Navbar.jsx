import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './../Button/Button'
import './navbar.css'

const Navbar = ({ loggedUser, setIsSignup, setLoggedUser }) => {
  const navigate = useNavigate()

  const logOut = () => {
    setLoggedUser({})
    localStorage.clear()
  }

  const renderContent = () => {
    return <div className="user-nav-container">
      <div className="greeting">
        <span>שלום&nbsp; </span>
        {loggedUser.email ? loggedUser.name : 'אורח'}
      </div>
      {loggedUser.email ?
        <>
          <Link to="/drugs">לרשימת התרופות שלך</Link>
          <Button content="התנתק" oncClickFunc={} />
        </>
        :
        <>
        <div className="btn-container">
          <Button oncClickFunc={() => updateSignStatusAndRedirect(true)} content="הירשם" />
          <Button oncClickFunc={() => updateSignStatusAndRedirect(false)} content="התחבר" />
        </div>
        <Link to="/drugs">צור רשימת תרופות</Link>
        </>}
    </div>
  }

  const updateSignStatusAndRedirect = isSign => {
    setIsSignup(isSign)
    navigate('/auth')
  }


  return <nav className='nav'>
    {renderContent()}
  </nav>
}

export default Navbar