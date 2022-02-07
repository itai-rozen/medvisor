import React, { useState, useEffect } from 'react'
import { Autocomplete, InputLabel, MenuItem, Select, TextField, FormControl } from '@mui/material/';
import dayjs from 'dayjs'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'
import { Consumer } from './../../components/Context'
import './addDrug.css'


const AddDrug = ({ user, drugList }) => {
  const [drugName, setDrugName] = useState('')
  const [isWhenNeeded, setIsWhenNeeded] = useState(false)
  const [unitAmount, setUnitAmount] = useState(1)
  const [times, setTimes] = useState(1)
  const [timeUnit, setTimeUnit] = useState('day')
  const [drugStrs, setDrugStrs] = useState([])
  const [startingDate, setStartingDate] = useState(new Date())
  const [dates, setDates] = useState([])
  const [notes, setNotes] = useState('')
  const spreadDrugObjs = () => {
    const drugs = []
    drugList.forEach((drugObj, index) => {
      for (let prop in drugObj) drugs.push(drugObj[prop])
    })
    const uniqueDrugs = [...new Set(drugs)]
    console.log(uniqueDrugs)
    setDrugStrs(uniqueDrugs)
    console.log(drugStrs)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('drug name: ', drugName)
    console.log('when needed? ', isWhenNeeded)
    console.log('amount of units: ', unitAmount)
    console.log('times per ', times)
    console.log('time unit: ', timeUnit)
    console.log('notes: ', notes)
    console.log('starting dateL ',startingDate)
  }


  useEffect(() => {
    spreadDrugObjs()
  }, [drugList])

  return <Consumer>
    {
      c =>
        <div className="form-container">
          <form className="add-drug-form" onSubmit={handleSubmit}>
            הרופא רשם לי
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={drugStrs}
              sx={{ width: 300 }}
              value={drugName}
              onChange={e => setDrugName(e.target.innerText)}
              renderOption={(props, option) => {
                return (
                  <li  {...props}>
                    {option}
                  </li>
                )
              }}
              renderInput={(params, index) => <TextField key={params.label + index} {...params} label="הקלד שם תרופה או חומר פעיל" />}
            />
            משטר נטילה
            <label htmlFor="whenNeeded">
              לפי הצורך
              <input type="checkbox" name="whenNeeded" id="whenNeeded" defaultValue={false} onChange={() => setIsWhenNeeded(!isWhenNeeded)} />
            </label>
            {
              !isWhenNeeded && <div className="form-choices">
                <TextField
                  variant="outlined"
                  value={unitAmount}
                  onChange={e => setUnitAmount(e.target.value)}
                  name="unitAmount"
                  label="כמות"
                  type="number"
                  required />
                יחידות
                <TextField
                  variant="standard"
                  value={times}
                  onChange={e => setTimes(e.target.value)}
                  name="times"
                  label="פעמים"
                  type="number"
                  required />
                כל
                <FormControl >
                  <InputLabel id="demo-simple-select-label">תדירות</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={timeUnit}
                    label="תדירות"
                    onChange={e => setTimeUnit(e.target.value)}
                  >
                    <MenuItem value={'day'}>יום</MenuItem>
                    <MenuItem value={'week'}>שבוע</MenuItem>
                    <MenuItem value={'month'}>חודש</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    label="ת.התחלה"
                    value={startingDate}
                    onChange={(newValue) => {
                      setStartingDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <TextField
                  id="outlined-textarea"
                  label="הערות נוספות לנטילה"
                  placeholder="עם אוכל"
                  multiline
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>

            }
            <input type="submit" value="הוסף תרופה" />
          </form>
        </div >
    }
  </Consumer >

}

export default AddDrug