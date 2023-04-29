import React from 'react';
import './Lista.css';


export const Lista = ({adminData}) => {
  return (
    <div className='list-user'>
        
        <span>Name: {adminData?.name}</span>
        <br/><br/>
        <span>Surname: {adminData?.secName}</span>
        <br/><br/>
        <span>E-mail: {adminData?.email}</span>
        <br/><br/>
        <span>Phone Number: {adminData?.phone}</span>
        <br/><br/>
        <span>Metamask Account: <br/><h6>{adminData?.adMeta}</h6></span>
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