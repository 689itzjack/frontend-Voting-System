import React from 'react'
import './ErrorLogedin.css'

export const ErrorLogedin = ({message}) => {
  return (
    <div className='error-page'>

        <h1>Errorpage 404</h1>
        <h2>{message}</h2>
        
    </div>
    
    
    
  )
}
