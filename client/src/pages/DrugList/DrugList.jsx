import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './../../components/Button/Button'
import axios from 'axios'
import AddDrug from '../../components/AddDrug/AddDrug'
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import InteractionCheck from '../../components/InteractionCheck/InteractionCheck'
import './drugList.css'
import { Consumer } from '../../components/Context'
import Spinner from '../../components/Spinner/Spinner'

const DrugList = ({ getUser, loggedUser, setLoggedUser }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showInteractionsModal, setShowInteractionsModal] = useState(false)

  const deleteDrug = async drugName => {
    setIsLoading(true)
    if (loggedUser.email) {
      try {
        const { email } = loggedUser
        const res = await axios.post('/api/drug/deleteDrug', { email, drugName })
        if (res.error) throw res.error
        getUser()
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    } else {
      const { medicines } = loggedUser
      setLoggedUser({ ...loggedUser, medicines: medicines.filter(medicine => medicine.drugName !== drugName) })
    }
    setIsLoading(false)
  }

  return <Consumer >
    {
      c =>
        <div className='druglist-container'>
          <h2>רשימת התרופות שלך</h2>
          <div className="druglist-wrapper">

            <ul className="medicine-headers list">
              <li className='header-item item name'>שם התרופה</li>
              <li className='header-item item when-needed'>משטר נטילה</li>
              <li className='header-item item amount'>יחידות בכל נטילה</li>
              <li className='header-item item times'>פעמים</li>
              <li className='header-item item time-unit'>תדירות</li>
              <li className='header-item item notes'>הערות לנטילה</li>
              <li className='header-item item description'>תיאור</li>
              <li className='header-item item delete'></li>
            </ul>
            {loggedUser.medicines && loggedUser.medicines.map(medicine => {
              const { drugName, isWhenNeeded, unitAmount, times, timeUnit, notes, description } = medicine
              return <ul className="medicine-details-list list" key={drugName}>
                <li className="medicine-details-item item name">{drugName}</li>
                <li className="medicine-details-item item when-needed">{isWhenNeeded ? 'לפי הצורך':'באופן קבוע'}</li>
                <li className="medicine-details-item item amount">{unitAmount}</li>
                <li className="medicine-details-item item times">{times}</li>
                <li className="medicine-details-item item time-unit">{timeUnit}</li>
                <li className="medicine-details-item item notes">{notes}</li>
                <li className="medicine-details-item item description">{description}</li>
                <li className="medicine-details-item item delete"><Button content={<RemoveCircleTwoToneIcon />} oncClickFunc={() => deleteDrug(drugName)} /></li>
              </ul>
            })}
          </div>
          <Button content="הוסף תרופה" oncClickFunc={() => c.actions.setShowAddModal(true)} />
          {c.showAddModal && <AddDrug loggedUser={loggedUser} setLoggedUser={setLoggedUser} setShowAddModal={c.actions.setShowAddModal} getUser={getUser} drugList={c.drugList} />}
          {
            (loggedUser.email && loggedUser.medicines?.length > 0) && <Button content="לניהול התזכורות" oncClickFunc={() => navigate("/reminders")} />
          }
          {
            (loggedUser.medicines?.length > 1) && <Button content="בדוק התנגשויות בין תרופות" oncClickFunc={() => setShowInteractionsModal(true)} />
          }
          {
            showInteractionsModal && <InteractionCheck setShowInteractionsModal={setShowInteractionsModal} medicines={loggedUser.medicines} />
          }

         {isLoading && <Spinner />} 
        </div>
    }
  </Consumer>
}

export default DrugList