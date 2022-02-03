import React, { useState, useEffect } from 'react'
import { Consumer } from './../../components/Context'
import './organizer.css'

const Organizer = () => {

    useEffect(() => {

    }, [])
    return <Consumer >
        {
            values => 
            <div className="organizer-container">
            </div>
        }
    </Consumer>
}

export default Organizer