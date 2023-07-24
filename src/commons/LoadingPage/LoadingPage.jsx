import React from 'react';
import { Title } from '../Title/Title';
import './LoadingPage.css';


export const LoadingPage = () => {
  return (
    <>
        <div className='loader'>
          <Title textTitle={"LOADING..."} classType="load-Page" /> 
          <br/>
          <br/>
        </div>  
       
    </>
    
  )
}
