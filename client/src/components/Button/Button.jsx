import React from 'react'
import './button.css'

const Button = ({content, oncClickFunc}) => {
    return <button onClick={oncClickFunc}>{content}</button>
}

export default Button
