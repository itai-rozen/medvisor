import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddReminder from '../../components/addReminder/addReminder'
import Button from '../../components/Button/Button'
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner';
import './reminderList.css'

const ReminderList = ({loggedUser,reminders,getReminders}) => {
  const [showReminderModal,setShowReminderModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
  const navigate = useNavigate()

  const getTimeUnitStr = str => {
    const schedArr = str.split(' ')
    const days = schedArr[4].split(',').map(n => weekDays[n]).join(' ו')
    const hours =   ' בשעה ' + schedArr[1].split(',').join(' ו ')
    let timeStr = ''
    if (schedArr[4] !== '*') {
      timeStr += ' תזכורת שבועית ביום' 
      timeStr +=  days
    } else if (schedArr[3] !== '*'){
      timeStr += 'תזכורת חודשית ביום '
      timeStr += days
    } else {
      timeStr += 'תזכורת יומית '
    }
    timeStr += hours
    return timeStr
  }

  const deleteReminder = async _id => {
    try {
      setIsLoading(true)
      const res = await axios.delete(`/api/reminder/${_id}`)
      setIsLoading(false)      
      getReminders()
    }catch(err){
      console.log(err)
      setIsLoading(false)      
    }
  }

  useEffect(() => {


  },[loggedUser])

  return <div className="reminders-container">
    <h2>תזכורות</h2>
    <div className="reminders-wrapper">

    <ul className="reminder-header-list list">
      <li className="reminder-header-title">תרופות בתזכורת</li>
      <li className="reminder-header-title">סוג תזכורת</li>
      <li className="reminder-header-title"></li>
    </ul>
    <ul className="reminders-list list">
      {reminders.filter(reminder => reminder.email === loggedUser.email).map(reminder => {
        return <ul className='reminder-item-list' key={reminder._id}>
        <li className="reminder-item-list"   >
          <ul className="reminder-medicines">
            {reminder.medicines.map(med => <li key={med} className='reminder-medicine-item'>{med}</li> )}
            </ul>
        </li>
        <li className='reminder-item-list'>{getTimeUnitStr(reminder.schedule)}</li>
        <li className='reminder-item-list'><Button content={<RemoveCircleTwoToneIcon />} oncClickFunc={() => { deleteReminder(reminder._id) }} /></li>
        </ul>
      })}
    </ul>
    </div>
    <div className="reminder-btn-container">

    {(loggedUser.medicines?.length > 0) && <Button  content="קבע תזכורת" oncClickFunc={() => setShowReminderModal(true)} />}
    {showReminderModal && <AddReminder email={loggedUser.email} getReminders={getReminders} setShowReminderModal={setShowReminderModal} />}
    <Button content="חזרה לרשימת התרופות" oncClickFunc={() => navigate("/drugs")} />
    </div>
    {isLoading && <Spinner />}

  </div>
}

export default ReminderList