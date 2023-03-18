import React from 'react'
import { Lista } from '../../commons/lista/Lista'
import './HomeAdmin.css';
import '../../commons/lista/Lista.css'
import { Button } from '../../commons/Button/Button';
import { Title } from '../../commons/Title/Title';
import votingPhoto from '../../assets/images/Picture1.png'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


export const HomeAdmin = ( {dataUser} ) => {

    
  
  return (
    <div className='page-admin'>
        <aside>
            <h1>Hi {dataUser?.name}!<br/><br/> Welcome to the voting system</h1>
            <div className='container-list'>
                <Lista adminData={dataUser}/>
            </div>
        </aside>
        <main className='main-admin'>
            <br/>
            <Title textTitle="Please choice an option:" classType="title-Admin"/>
            <br/>
            <br/>
            <Button text="Create a new course" classButton="admin-main-buttons" />
            <br/>
            <br/>
            <Button text="Watch results of a Course" classButton="admin-main-buttons" />
            <br/>
            <br/>
            <img src={votingPhoto} alt="Voting photo" />
        </main>
    </div>
        
  )
}
