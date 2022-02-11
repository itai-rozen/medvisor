import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
const Footer = () => {
  return <footer className="footer">
    <Link to="/">MedVisor</Link>
    <>&copy; Itai Rozen</>
  </footer>
}

export default Footer