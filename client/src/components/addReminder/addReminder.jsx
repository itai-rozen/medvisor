import React, { useState, useEffect } from 'react'
import Button from '../Button/Button'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'
import { InputLabel, MenuItem, Select, TextField, FormControl } from '@mui/material/';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Consumer } from './../Context'
import AddSchedule from './AddSchedule/AddSchedule';
import Spinner from './../../components/Spinner/Spinner'
import axios from 'axios'
import './addReminder.css'

const AddReminder = ({ setShowReminderModal, email, getReminders }) => {
  const [medicines, setMedicines] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [timeUnit, setTimeUnit] = useState('')
  const [times, setTimes] = useState(0)
  const [scheduleNumbers, setScheduleNumbers] = useState([])
  const [scheduleTime, setScheduleTime] = useState('')
  const [error, setError] = useState('')
  const addMedToReminderList = (times,medName,amount) => {
    if (medicines.find(med => med === `${amount} יחידות  מהתרופה ${medName} - `)){
      setError('לא ניתן לבחור את אותה תרופה פעמיים')
      return
    }
    setMedicines([...medicines, `${amount} יחידות  מהתרופה ${medName} - `])
  }
  const removeMedFromList = medName => setMedicines(medicines.filter(med => med !== medName))
  const resetError = () => setError('')

  const updateScheduleArrLengthByTimes = num => {
    setTimes(+num)
    const newArr = Array(+num).fill(null)
    setScheduleNumbers(newArr)
  }

  const checkErrors = () => {
    let errorString = ''
    if (!medicines.length > 0) errorString = 'יש לבחור תרופה אחת לפחות'
    if (!timeUnit) errorString = 'יש לבחור תדירות רצויה'
    if (scheduleNumbers.every(num => !num)) errorString = 'יש לבחור ימים ושעות לקבלת התזכורת'
    if (timeUnit !== 'day' && !scheduleTime) errorString = 'יש לבחור שעה לקבלת התזכורת'
    setError(errorString)
    return (errorString.length > 0)
  }

  const addReminder = () => {
    const isErrors = checkErrors()
    if (isErrors) return
    const scheduleString = generateScheduleString()
    setReminder(scheduleString)
  }

  const generateScheduleString = () => {
    let scheduleStr = ''
    if (timeUnit === 'day') {
      scheduleStr = `0 ${scheduleNumbers.join()} * * *`
    } else if (timeUnit === 'week') {
      scheduleStr = `0 ${scheduleTime} * * ${scheduleNumbers.join()}`
    } else scheduleStr = `0 ${scheduleTime} ${scheduleNumbers.join()} * *`
    return scheduleStr
  }

  const setReminder = async str => {
  
    try {
      setIsLoading(true)
      const res = await axios.post('/api/reminder', { email,medicines,schedule:str })
      setIsLoading(false)
      getReminders()
      setShowReminderModal(false)
    } catch (err) {
      setError(err.error)
      setIsLoading(false)

    }
  }


  useEffect(() => {
    resetError()
  }, [times, scheduleNumbers])


  return <Consumer>
    {
      c =>
        <div className="reminder-container">
          <div className="reminder-modal modal">
            <Button content="X" oncClickFunc={() => setShowReminderModal(false)} />
            <h3>הוסף תרופות מהרשימה לתזכורת</h3>
            <div className="medication-choices-container">
              <div className="patient-medications list-container">
                <h4><LocalHospitalIcon /></h4>
                <ul className="med-list reminder-list">
                  {c.loggedUser.medicines.map(med => {
                    return <li className='med-item' key={med.drugName} onClick={() => addMedToReminderList(med.times,med.drugName,med.unitAmount)}>{med.times} x {med.drugName} x {med.unitAmount}</li>
                  })}
                </ul>
              </div>
              <div className="reminder-medications list-container">
                <h4><AccessAlarmIcon /></h4>
                <ul className="reminder-medication-list reminder-list">
                  {medicines.map(medicine => {
                    return <li className="med-item" key={medicine} onClick={() => removeMedFromList(medicine)}>{medicine}</li>
                  })}
                </ul>
              </div>
            </div>
            <div className="duration-details">
              {(medicines.length > 0) && <FormControl >
                <InputLabel id="demo-simple-select-label">תדירות </InputLabel>
                <Select

                  variant='standard'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={timeUnit}
                  label="תדירות"
                  onChange={e => setTimeUnit(e.target.value)}
                >
                  <MenuItem value={'day'}>כל יום</MenuItem>
                  <MenuItem value={'week'}>כל שבוע</MenuItem>
                  <MenuItem value={'month'}>כל חודש</MenuItem>
                </Select>
              </FormControl>
              }
              {timeUnit && <TextField
                inputProps={{ min: 1, max: 10, style: { textAlign: 'center' } }}
                variant="standard"
                onChange={e => updateScheduleArrLengthByTimes(e.target.value)}
                name="times"
                label="מספר פעמים"
                type="number"
                required />
              }
            </div>
            <div className="schedule-inputs">
              {
                (times > 0) && scheduleNumbers.map((_, i) => <AddSchedule
                  key={i}
                  index={i}
                  scheduleNumbers={scheduleNumbers}
                  setScheduleNumbers={setScheduleNumbers}
                  timeUnit={timeUnit}
                />)
              }
              {
                timeUnit !== 'day' && (times > 0) && timeUnit && <input type="time" onChange={e => setScheduleTime(e.target.value)} id="" />
              }
              <h3>התזכורות יישלחו למייל איתו נרשמת.</h3>
            </div>
    
            <div id="add-reminder-btn">
            <Button content="הוסף תזכורת" onClickFunc={() => addReminder()} />
            </div>
            <div className="error-message">{error}</div>
          </div>
          {isLoading && <Spinner />}
        </div>
    }
  </Consumer>
}

export default AddReminder