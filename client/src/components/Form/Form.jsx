import React, { useState, useEffet } from 'react'
import './form.css'

const Form = () => {
    const [drugName, setDrugName] = useState('')
    const [drugType, setDrugType] = useState('tab')
    const [isWhenNeeded, setIsWhenNeeded] = useState(false)
    const [unitAmount, setUnitAmount] = useState(1)
    const [timesPerDay, setTimesPerDay] = useState(0)
    const [daysDuration, setDaysDuration] = useState(1)

    return 
}

export default Form