import React, { useState, useEffect } from 'react'
import { Autocomplete, InputLabel, MenuItem, FormControlLabel, Checkbox, Select, TextField, FormControl } from '@mui/material/';
import { Consumer } from '../Context'
import axios from 'axios'
import Button from './../Button/Button'
import './addDrug.css'
import Spinner from '../Spinner/Spinner';


const AddDrug = ({ loggedUser, setLoggedUser, drugList, getUser, setShowAddModal }) => {
  const [drugName, setDrugName] = useState('')
  const [isWhenNeeded, setIsWhenNeeded] = useState(false)
  const [unitAmount, setUnitAmount] = useState(0)
  const [times, setTimes] = useState(0)
  const [timeUnit, setTimeUnit] = useState('day')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  
  const [isLoading,setIsLoading] = useState(false)

  const resetStates = () => {
    setDrugName('')
    setIsWhenNeeded(false)
    setUnitAmount(0)
    setTimes(0)
    setTimeUnit('day')
    setNotes('')
    setError('')
  }



  const getDrugDescription = async () => {
    const chosenDrug = drugList.find(drug => {
      if (drug.drugHebTitle === drugName ||
        drug.drugEngTitle === drugName ||
        drug.activeIngredient === drugName) return drug
    })
    // TODO see if this function fetches the id correctly, add it to the medicine object and
    // continue with fetching the description!
    if (chosenDrug.activeIngredient) {
      const { activeIngredient } = chosenDrug
      const ingredientForApiFetching = activeIngredient?.split(' ')?.join('+')
      try {
        const rxIdRes = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${ingredientForApiFetching}&search=2`)
        const rxId = rxIdRes.data?.idGroup?.rxnormId[0]
        console.log('drug rxid @getDrugDescription @addDrug: ', rxId)
        const descriptionRes = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxclass/class/byDrugName.json?drugName=${ingredientForApiFetching}&relaSource=MEDRT&relas=may_treat`)
        console.log('description res: ', descriptionRes)
        const descriptionArr = descriptionRes.data?.rxclassDrugInfoList?.rxclassDrugInfo || []
        console.log('description arrat: ', descriptionArr)
        const description = descriptionArr.map(desc => desc.rxclassMinConceptItem?.className).join(',')
        console.log('drug description @getDrugDescription @addDrug: ', description)

        return { description, rxId }
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }
  }

  const addDrug = async e => {
    setIsLoading(true)

    e.preventDefault()
    const { description, rxId } = await getDrugDescription()
    console.log('description and rxid @handleSubmit @addDrug cpt: ', description, ' ', rxId)
    if (loggedUser.email) {
      console.log('with backend')
      try {
      const res = await axios.post('/api/drug/addDrug', {
        email: loggedUser.email,
        drugName,
        isWhenNeeded,
        unitAmount,
        times,
        timeUnit,
        notes,
        rxId,
        description
      })
      console.log('result @addDrug @addDrug: ', res)
      getUser()
    }catch(err){
      setError(err.messaage)
      setIsLoading(false)
    }

    } else {
      console.log('local')
      const loggedUserCopy = { ...loggedUser }
      if (!loggedUserCopy.medicines) loggedUserCopy.medicines = []
      if (loggedUserCopy.medicines.find(med => med.drugName === drugName)) {
        setError('לא ניתן להזין את  אותה התרופה פעמיים')
        return
      }
      loggedUserCopy.medicines.push({
        drugName,
        isWhenNeeded,
        unitAmount,
        times,
        timeUnit,
        notes,
        description,
        rxId
      })
      console.log('logged user: ', loggedUserCopy)
      setLoggedUser(loggedUserCopy)
    }
    setIsLoading(false)
    resetStates()
    setShowAddModal(false)
  }


  useEffect(() => {

  }, [])

  return <Consumer>
    {
      c =>
        <div className="form-container">
          <form className="add-drug-form modal" onSubmit={addDrug}>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={c.drugStrs}
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
            <FormControlLabel control={<Checkbox onChange={() => setIsWhenNeeded(!isWhenNeeded)} size="medium" />} label="לפי הצורך" />
            <div className="form-choices-container">
              {
                !isWhenNeeded && <div className="form-choices">
                  <TextField
                    inputProps={{ min: 0, style: { textAlign: 'center', direction: 'rtl' } }}
                    variant="standard"
                    onChange={e => setUnitAmount(e.target.value)}
                    name="unitAmount"
                    label="כמות יחידות"
                    type="number"
                    required
                    sx={{
                      direction: 'rtl',
                      textAlign: 'right'
                    }} />

                  <TextField
                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    variant="standard"
                    onChange={e => setTimes(e.target.value)}
                    name="times"
                    label="פעמים"
                    type="number"
                    required />

                  <FormControl >
                    <InputLabel id="demo-simple-select-label">תדירות</InputLabel>
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
            </div>
            <input type="submit" value="הוסף תרופה" />
            <Button content="X" oncClickFunc={() => c.actions.setShowAddModal(false)} />
          </form>
          <div className="message">{error}</div>
          {isLoading && <Spinner />}
        </div >
    }
  </Consumer >

}

export default AddDrug