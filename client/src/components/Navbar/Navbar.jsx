import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './../Button/Button'
import './navbar.css'

const Navbar = ({ loggedUser, setIsSignup, setLoggedUser }) => {
  const navigate = useNavigate()

  const logOut = () => {
    setLoggedUser({})
    localStorage.clear()
    navigate('/')
  }

  const updateSignStatusAndRedirect = isSign => {
    setIsSignup(isSign)
    navigate('/auth')
  }
  const renderContent = () => {
    return <nav className="nav-container">
      <div className="greeting">
       שלום, 
        {loggedUser.email ? loggedUser.name : '  אורח'}

        <>
        {loggedUser.email ?
          <Button content="התנתק" oncClickFunc={logOut} />
          :
        <div className="btn-container">
          <Button oncClickFunc={() => updateSignStatusAndRedirect(true)} content="הירשם" />
          <Button oncClickFunc={() => updateSignStatusAndRedirect(false)} content="התחבר" />
        </div>
        }
        </>
      </div>
      
      <Link to="/drugs">{loggedUser.email ? 'לרשימת התרופות' : 'צור רשימת תרופות'}</Link>

    </nav>
  }




  return <nav className='nav'>
    {renderContent()}
  </nav>
}

export default Navbar