import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './../../components/Button/Button'
import './reminderList.css'

const ReminderList = ({loggedUser}) => {
  const [showReminderModal,setShowReminderModal] = useState(false)
  return <div className="reminders-container">
    {(loggedUser.medicines?.length > 0) && <Button  content="קבע תזכורת" oncClickFunc={() => setShowReminderModal(true)} />}

    <Link to="/drugs">חזרה לרשימת התרופות</Link>
  </div>
}

export default ReminderList