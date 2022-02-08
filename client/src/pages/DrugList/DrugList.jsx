import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './../../components/Button/Button'
import axios from 'axios'
import AddDrug from '../../components/AddDrug/AddDrug'
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import './drugList.css'
import { Consumer } from '../../components/Context'

const DrugList = ({ getUser, loggedUser, setLoggedUser }) => {
  const deleteDrug = async drugName => {
    if (loggedUser.email) {
      try {
        const { email } = loggedUser
        await axios.post('/api/drug/deleteDrug', { email, drugName })
        getUser()
      } catch (err) {
        console.log(err)
      }
    } else {
      const { medicines } = loggedUser
      setLoggedUser(...medicines.filter(medicine => medicine.drugName !== drugName))
    }
  }

  return <Consumer >
    {
      c =>
        <div className='druglist-container'>
          <h2>רשימת התרופות שלך</h2>
          <div className="druglist-wrapper">

            <ul className="medicine-headers">
              <li className='header-item'>שם התרופה</li>
              <li className='header-item'>לפי הצורך</li>
              <li className='header-item'>יחידות בכל נטילה</li>
              <li className='header-item'>פעמים</li>
              <li className='header-item'>תדירות</li>
              <li className='header-item'>הערות לנטילה</li>
              <li className='header-item'>תיאור</li>
              <li className='header-item'></li>
            </ul>
            {loggedUser.medicines && loggedUser.medicines.map(medicine => {
              const { drugName, isWhenNeeded, unitAmount, times, timeUnit, notes, description } = medicine
              return <ul className="medicine-details-list" key={drugName}>
                <li className="medicine-details-item">{drugName}</li>
                <li className="medicine-details-item">{isWhenNeeded}</li>
                <li className="medicine-details-item">{unitAmount}</li>
                <li className="medicine-details-item">{times}</li>
                <li className="medicine-details-item">{timeUnit}</li>
                <li className="medicine-details-item">{notes}</li>
                <li className="medicine-details-item">{description}</li>
                <li className="medicine-details-item"><Button content={<RemoveCircleTwoToneIcon />} oncClickFunc={() => deleteDrug(drugName)} /></li>
              </ul>
            })}
          </div>
          <Button content="הוסף תרופה" oncClickFunc={() => c.actions.setShowAddModal(true)} />
          {c.showAddModal && <AddDrug loggedUser={loggedUser} setLoggedUser={setLoggedUser} getUser={getUser} drugList={c.drugList} />}
          {
            (loggedUser?.medicines?.length > 0) && <Link to="/reminders">לניהול התזכורות</Link>
          }


        </div>
    }
  </Consumer>
}

export default DrugList