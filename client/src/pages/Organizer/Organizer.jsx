import React, { useState, useEffect } from 'react'
import { Consumer } from './../../components/Context'
import './organizer.css'
import Form from '../../components/Form/Form'

const Organizer = () => {

    useEffect(() => {

    }, [])
    return <Consumer >
        {
            values => 
            <div className="organizer-container">
                {values.drugList.map(drug)}
            </div>
        }
    </Consumer>
}

export default Organizer