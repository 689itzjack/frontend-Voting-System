import React from 'react'
import { useRouteError } from 'react-router-dom';


export const Errorpage = () => {
    const errorCurr = useRouteError;
  return (
    <div className='error-page'>
        <h1>Errorpage</h1>
        <p>{errorCurr.statusText || errorCurr.message}</p>
    </div>
  )
}
