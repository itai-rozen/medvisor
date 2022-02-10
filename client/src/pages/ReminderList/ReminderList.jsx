import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddReminder from '../../components/addReminder/addReminder'
import Button from '../../components/Button/Button'
import './reminderList.css'

const ReminderList = ({loggedUser,reminders,getReminders}) => {
  const [showReminderModal,setShowReminderModal] = useState(false)

  const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']

  const getTimeUnitStr = str => {
    const schedArr = str.split(' ')
    const days = schedArr[4].split(',').map(n => weekDays[n]).join(' ו')
    const hours = schedArr[1].split(',').join(' ו ') + ' בשעה '
    let timeStr = ''
    if (schedArr[4] !== '*') {
      timeStr += ' תזכורת שבועית ביום' 
      timeStr +=  days
    } else if (schedArr[3] !== '*'){
      timeStr += 'תזכורת חודשית ביום '
      timeStr += days
    } else {
      timeStr += 'תזכורת יומיומית '
    }
    timeStr += hours
  }
  useEffect(() => {


  },[loggedUser])
  return <div className="reminders-container">
    <ul className="reminder-header-list">
      <li className="reminder-header-title">תרופות בתזכורת</li>
      <li className="reminder-header-title">סוג תזכורת</li>
    </ul>
    <ul className="reminders-list">
      {reminders.filter(reminder => reminder.email === loggedUser.email).map(reminder => {
        return <ul className='reminder-item-list' key={reminder._id}>
        <li className="reminder-item" >
          <ul className="reminder-medicines">
            {reminder.medicines.map(med => <li key={med} className='reminder-medicine-item'>{med}</li> )}
            </ul>
        </li>
        <li className='reminder-item-list'>{getTimeUnitStr(reminder.schedule)}</li>
        </ul>
      })}
    </ul>
    {(loggedUser.medicines?.length > 0) && <Button  content="קבע תזכורת" oncClickFunc={() => setShowReminderModal(true)} />}
    {showReminderModal && <AddReminder email={loggedUser.email}  setShowReminderModal={setShowReminderModal} />}
    <Link to="/drugs">חזרה לרשימת התרופות</Link>
  </div>
}

export default ReminderList