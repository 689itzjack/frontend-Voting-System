import React from 'react';
import './Lista.css';


export const Lista = ({adminData}) => {
  return (
    <div className='list-user'>
        <span id='title'>Data User</span><br/><br/>
        <span className='span-List-Side' >Name: </span><span>{adminData?.name}</span>
        <br/><br/>
        <span className='span-List-Side'>Surname: </span><span>{adminData?.secName}</span>
        <br/><br/>
        <span className='span-List-Side'>E-mail: </span><span>{adminData?.email}</span> 
        <br/><br/>
        <span className='span-List-Side'>Phone Number: </span><span>{adminData?.phone}</span>
        <br/><br/>
        <span className='span-List-Side'>Metamask Account: </span><br/><span className='meta-Adrs'>{adminData?.adMeta}</span> 
    </div>
  )
}
/**uidUser: uidUSER,
    name: name, 
    secName: secName,
    email: email,
    phone: phone,
    adMeta: adMeta,
    pass: pass,
    rol: rol, */