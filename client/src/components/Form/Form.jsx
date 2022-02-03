import React, { useState, useEffet } from 'react'
import './form.css'

const Form = () => {
    const [drugName, setDrugName] = useState('')
    const [drugType, setDrugType] = useState('tab')
    const [isWhenNeeded, setIsWhenNeeded] = useState(false)
    const [unitAmount, setUnitAmount] = useState(1)
    const [timesPerDay, setTimesPerDay] = useState(0)
    const [daysDuration, setDaysDuration] = useState(1)

    return <div className="form-container">
        <form action="">
            <label htmlFor="drugName">שם התרופה</label>
            <input type="text" name="drugName" placeholder='מיקרופירין 75 מ"ג' id="drugName" value={drugName} />
            
            <label htmlFor="whenNeeded">לפי הצורך</label>
            <input type="checkbox" name="whenNeeded" id="whenNeeded" defaultValue={false} onChange={() => setIsWhenNeeded(!isWhenNeeded)} />
            {
                !isWhenNeeded && <div className="form-choices">
                    <label htmlFor="unitAmount">כמות</label>
            <input type="number" name="unitAmount" id="unitAmount" onChange={(e) => setUnitAmount(e.target.value)} value={unitAmount} />
            <label htmlFor="timesPerDay">כמה פעמים ביום</label>
            <input type="number" name="timesPerDay" id="timesPerDay" onChange={(e) => setTimesPerDay(e.target.value)} value={timesPerDay} />
            <label htmlFor="">כל
            <input type="number" name="daysduration" id="daysDuration" onChange={e => setDaysDuration(e.target.value)} value={daysDuration} />
            ימים
            </label>
            </div>

                
            }
        </form>
    </div>
}

export default Form