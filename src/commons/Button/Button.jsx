import React from 'react';
import './Button.css'


export const Button = ({text,classButton,typeButton,handlerFunction}) => {
  return (
    <button
    className= {classButton}
    type = {typeButton}
    onClick={(event) => {handlerFunction(event)}}>{text}</button>
  )
  
}
