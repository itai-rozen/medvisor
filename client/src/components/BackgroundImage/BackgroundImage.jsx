import React from 'react'
import './backgroundImage.css'
const BackgroundImage = () => {
  return <div className="img-container">
    <img src={'/about-bg.png'} alt="medvisor background" />
    <div className="block"></div>
  </div>
}

export default BackgroundImage