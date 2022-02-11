import React, { useState, useEffect, useReducer } from 'react'
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import Footer from './../../components/Footer/Footer'
import { Consumer } from '../../components/Context'
import './about.css'
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage'

const About = ({ setIsSignup }) => {

  useEffect(() => {

  }, [])
  return <Consumer >
    {
      c =>
        <div className="about-container">
          <header>
            <h1 className="header">MedVisor</h1>
          </header>
          <h2 className="description-header">
            ארגונית התרופות החכמה שהולכת איתך לכל מקום
          </h2>
          <h3>
            נהל את שגרת התרופות שלך בחוכמה, במהירות ובקלות.
          </h3>
          <BackgroundImage />

        </div>
    }
  </Consumer>
}

export default About