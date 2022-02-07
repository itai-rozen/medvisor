import React from 'react'
import Button from '../Button/Button'
import './reminder.css'

const Reminder = ({drugName,setShowReminderModal,times,timeUnit}) => {
  return <div className="reminder-container">
    <div className="reminder-modal">
      <Button  content="X" oncClickFunc={() => setShowReminderModal(false)} />
      <h3>{drugName}</h3>
      
    </div>
  </div>
}

export default Reminder