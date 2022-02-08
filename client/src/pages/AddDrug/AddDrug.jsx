import React, { useState, useEffect } from 'react'
import { Autocomplete, InputLabel, MenuItem, Select, TextField, FormControl } from '@mui/material/';
import { Consumer } from './../../components/Context'
import axios from 'axios'
import './addDrug.css'


const AddDrug = ({ user, drugList }) => {
  const [drugName, setDrugName] = useState('')
  const [isWhenNeeded, setIsWhenNeeded] = useState(false)
  const [unitAmount, setUnitAmount] = useState(1)
  const [times, setTimes] = useState(1)
  const [timeUnit, setTimeUnit] = useState('day')
  const [drugStrs, setDrugStrs] = useState([])
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')



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

  const getDrugDescription = () => {
    const chosenDrug = drugList.find(drug => {                
      if (drug.drugHebTitle === drugName || 
          drug.drugEngTitle === drugName || 
          drug.activeIngredient === drugName) return drug
    })
     if (chosenDrug.activeIngredient){
       const {activeIngredient} = chosenDrug
       const rxId = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${activeIngredient}&search=2`)
     }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const description = getDrugDescription()
    if (loggedUser.email){
      await axios.post('/addDrug', {
        email: loggedUser.email,
        drugName,
        isWhenNeeded,
        unitAmount,
        times,
        timeUnit,
        notes
      })
    } else {
      if (!loggedUser.medicines) loggedUser.medicins = []
      loggedUser.medicines.push({
        drugName,
        isWhenNeeded,
        unitAmount,
        times,
        timeUnit,
        notes
      })
    }
    console.log('drug name: ', drugName)
    console.log('when needed? ', isWhenNeeded)
    console.log('amount of units: ', unitAmount)
    console.log('times per ', times)
    console.log('time unit: ', timeUnit)
    console.log('notes: ', notes)
  }


  useEffect(() => {
    spreadDrugObjs()
  }, [drugList])

  return <Consumer>
    {
      c =>
        <div className="form-container">
          <form className="add-drug-form" onSubmit={handleSubmit}>

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
                  label="כמות יחידות"
                  type="number"
                  required />

                <TextField
                  variant="standard"
                  value={times}
                  onChange={e => setTimes(e.target.value)}
                  name="times"
                  label="פעמים"
                  type="number"
                  required />

                <FormControl >
                  <InputLabel id="demo-simple-select-label">תדירות</InputLabel>
                  <Select
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
          <div className="message">{error}</div>
        </div >
    }
  </Consumer >

}

export default AddDrug