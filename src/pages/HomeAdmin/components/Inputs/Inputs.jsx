import React from 'react'
import './Inputs.css'

export const Inputs = ({atributte,handlerCh,clase}) => {

  if( atributte.type === "date"){//these tags are of type "date"
    var today = new Date();
    let newDate = "";
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if(month > 0 && month < 10){
      month = '0'+ month;
    }
    let day = today.getDate();
    if(day > 0 && day < 10){
      day = '0' + day;
    }
    newDate = year + "-" + month + "-" + day;
    //console.log("THE DATE IS: " + newDate);/////////////////////////////////////////////

    if(atributte.name === "third"){//this means that the input tag is optional
      return (
        <input 
            id={atributte.id} 
            name={atributte.name} 
            placeholder={atributte.placeHolder} 
            type={atributte.type}
            value={atributte.value}
            min= {newDate}
            onChange={(event) => handlerCh(event.target.name,event.target.value)} 
            className= {clase} 
            //autoComplete="off"
        />
      )
    }
    return (
      <input 
          id={atributte.id} 
          name={atributte.name} 
          placeholder={atributte.placeHolder} 
          type={atributte.type}
          value={atributte.value}
          min= {newDate}
          onChange={(event) => handlerCh(event.target.name,event.target.value)} 
          className= {clase} 
          required
          //autoComplete="off"
      />
    )
  }
  else{

    if(atributte.type === "number"){
      return (
        <input 
            id={atributte.id} 
            name={atributte.name} 
            placeholder={atributte.placeHolder} 
            type={atributte.type}
            value={atributte.value}
            min="0"
            onChange={(event) => handlerCh(event.target.name,event.target.value)} 
            className= {clase} 
            required
            //autoComplete="off"
        />
      )
    }
    
    return (
      <input 
          id={atributte.id} 
          name={atributte.name} 
          placeholder={atributte.placeHolder} 
          type={atributte.type}
          value={atributte.value}
          onChange={(event) => handlerCh(event.target.name,event.target.value)} 
          className= {clase} 
          required
          //autoComplete="off"
      />
    )
  }
    
  //}
  
}
