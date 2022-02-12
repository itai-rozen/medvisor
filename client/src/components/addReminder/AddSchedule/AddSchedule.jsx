import React, { useState } from "react";
import { InputLabel, MenuItem, Select, TextField, FormControl } from '@mui/material/';
import './addSchedule.css'

const AddSchedule = ({ index,timeUnit, setScheduleNumbers, scheduleNumbers }) => {
  const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
  
  const updateSchedule = num => {
      const shceduleCopy = [...scheduleNumbers]
      shceduleCopy[index] = num
      setScheduleNumbers(shceduleCopy)
  }

  const renderInputsObject = () => {
    if (timeUnit === 'day') {
      return    <div className="schedule-input"> <FormControl >
        <InputLabel id="demo-simple-select-label">תדירות</InputLabel>
      <Select
        variant='standard'
        value={timeUnit}
        label="שעה"
        onChange={e => updateSchedule(e.target.value)}
      >
        {[...Array(24)].map((_, i) => <MenuItem key={i} value={i}>{i}:00</MenuItem>)}
      </Select>
    </FormControl></div>
    } else if (timeUnit === 'week') {
      return <div className="schedule-input"> <FormControl >
        <InputLabel id="demo-simple-select-label">תדירות</InputLabel>
        <Select
          variant='standard'
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeUnit}
          label="תדירות"
          onChange={e => updateSchedule(e.target.value)}
        >
          {weekDays.map((day, i) => <MenuItem key={day} value={i}>{day}</MenuItem>)}
        </Select>
      </FormControl>
          </div>
    } else if (timeUnit === 'month') {
      return <div className="schedule-input">
      <input type="date" onChange={e => updateSchedule(e.target.value)} />
      </div> 
    } else return
  }


  return <div className="schedule-inputs-container">
    {renderInputsObject()}
  </div>

}

export default AddSchedule