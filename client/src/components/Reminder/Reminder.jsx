import React from 'react'
import Button from '../Button/Button'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'
import './reminder.css'

const Reminder = ({ setShowReminderModal }) => {
  return <div className="reminder-container">
    <div className="reminder-modal">
      <Button  content="X" oncClickFunc={() => setShowReminderModal(false)} />
      <h3>{}</h3>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    label="ת.התחלה"
                    value={startingDate}
                    onChange={(newValue) => {
                      setStartingDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider> */}
    </div>
  </div>
}

export default Reminder