import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Lista } from '../../commons/lista/Lista'
import UserFromDB from '../../Context/UserFromDB'
import './HomeStudent.css'



export const HomeStudent = ({ dataUser }) => {

//    console.log()
    const {userFromDB} = useContext(UserFromDB);

  return (
    <div className='page-student'>
        
        <aside>
            <h1>Hi Dear Student !<br/><br/> Welcome to the voting system</h1>
            <div className='container-list'>
                <Lista adminData={userFromDB}/>
            </div>
        </aside>
    </div>
  )
}
