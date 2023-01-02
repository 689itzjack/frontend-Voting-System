import React from "react";
import './Input.css';


export function Input( {atributte,handlerCh,param} ){
    return <div className="input_container">
        <input id={atributte.id} 
        name={atributte.name} 
        placeholder={atributte.placeHolder} 
        type={atributte.type}
        onChange={(event) => handlerCh(event.target.name,event.target.value)} 
        className="regular-style" />
    </div>
}