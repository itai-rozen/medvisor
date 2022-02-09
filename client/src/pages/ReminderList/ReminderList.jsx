import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AddReminder from '../../components/addReminder/addReminder'
import Button from '../../components/Button/Button'
import './reminderList.css'

const ReminderList = ({loggedUser}) => {
  const [showReminderModal,setShowReminderModal] = useState(false)
  const [reminders, setReminders] = useState(loggedUser.reminders)

  return <div className="reminders-container">

    {(loggedUser.medicines?.length > 0) && <Button  content="קבע תזכורת" oncClickFunc={() => setShowReminderModal(true)} />}
    {showReminderModal && <AddReminder reminders={reminders} setReminders={setReminders} setShowReminderModal={setShowReminderModal} />}
    <Link to="/drugs">חזרה לרשימת התרופות</Link>
  </div>
}

export default ReminderList