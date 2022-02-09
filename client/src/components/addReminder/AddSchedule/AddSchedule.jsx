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
      return <input type="time" id="" onChange={e => updateSchedule(e.target.value)} />
    } else if (timeUnit === 'week') {
      return <> <FormControl >
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
          </>
    } else if (timeUnit === 'month') {
      return <>
      <input type="date" onChange={e => updateSchedule(e.target.value)} />
      </> 
    } else return
  }


  return <>
    {renderInputsObject()}
  </>

}

export default AddSchedule