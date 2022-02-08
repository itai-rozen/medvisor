import React,{ useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './../../components/Button/Button'
import Reminder from './../../components/Reminder/Reminder'
import './drugList.css'

const DrugList = ({ loggedUser }) => {
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [reminder, setReminder] = useState({})


  return <div className='druglist-container'>
    <h2>רשימת התרופות שלך</h2>
    <div className="druglist-wrapper">

    <ul className="medicine-headers">
      <li className='header-item'>שם התרופה</li>
      <li className='header-item'>לפי הצורך</li>
      <li className='header-item'>יחידות בכל נטילה</li>
      <li className='header-item'>פעמים</li>
      <li className='header-item'>תדירות</li>
      <li className='header-item'>הערות לנטילה</li>
      <li className='header-item'>תזכורת</li>
    </ul>
    {loggedUser.email && loggedUser.medicines.map(medicine => {
      const { drugName, isWhenNeeded, unitAmount, times, timeUnit,notes} = medicine
      return <ul className="medicine-details-list" key={drugName}>
          <li className="medicine-details-item">{drugName}</li>
          <li className="medicine-details-item">{isWhenNeeded}</li>
          <li className="medicine-details-item">{unitAmount}</li>
          <li className="medicine-details-item">{times}</li>
          <li className="medicine-details-item">{timeUnit}</li>
          <li className="medicine-details-item">{notes}</li>
          <li className="medicine-details-item">{notes}</li>
      </ul>
    })}
    </div>
    <Link to="/addDrug">הוסף תרופה</Link>
    {(loggedUser?.medicines?.length > 0) && <Button  content="קבע תזכורת" oncClickFunc={() => setShowReminderModal(true)} />}
    { showReminderModal &&  <Reminder /> }

  </div>
}

export default DrugList