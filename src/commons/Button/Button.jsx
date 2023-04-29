import React from 'react';
import './Button.css'


export const Button = ({idButton,name,text,classButton,typeButton,theValue,handlerFunction}) => {
  return (
    <button
    id={idButton}
    name={name}
    className= {classButton}
    type = {typeButton}
    value = {theValue}
    onClick={(event) => {handlerFunction(event)}}>{text}</button>
  )
  
}
