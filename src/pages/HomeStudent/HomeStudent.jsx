import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Lista } from '../../commons/lista/Lista'
import './HomeStudent.css'



export const HomeStudent = ({ dataUser }) => {

//    console.log()


  return (
    <div className='page-student'>
        
        <aside>
            <h1>Hi Dear Student !<br/><br/> Welcome to the voting system</h1>
            <div className='container-list'>
                <Lista adminData={dataUser}/>
            </div>
        </aside>
    </div>
  )
}
