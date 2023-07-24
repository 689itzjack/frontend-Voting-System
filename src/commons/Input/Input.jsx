import React from "react";
import './Input.css';


export function Input( {atributte,handlerCh,param} ){

    // if(atributte.name === "pass" || atributte.name === "passwordReg2"){
    //     return(
    //         <div className="input_container">
    //         <input 
    //             id={atributte.id} 
    //             name={atributte.name} 
    //             placeholder={atributte.placeHolder} 
    //             type={atributte.type}
    //             value={atributte.value}
    //             onChange={(event) => handlerCh(event.target.name,event.target.value)} 
    //             className= {param ?  "password-error":"regular-style"} 
    //             //autoComplete="off"
    //         />
    //     </div>
    //     )
    // }

    return(
        <div className="input_container">
            <input 
                id={atributte.id} 
                name={atributte.name} 
                placeholder={atributte.placeHolder} 
                type={atributte.type}
                value={atributte.value}
                onChange={(event) => handlerCh(event.target.name,event.target.value)} 
                className= {param ?  "password-error":"regular-style"} 
                //autoComplete="off"
            />
        </div>
    )}
//recordemos q el atributo onChange es un detector de eventos que va a guardar una funcuion handler 
//que se va a ejecutar en ccuanto se lleve a cabo el evento. En este caso el evento va ser "Input", osea
//que en el momento que se meta caulquierescrito en el input se activa la funcion handler. 
//La funcion handler se llama "handlerCh" que va recibir 2 parametros "name" que va ser el nombre del
//input donde se esta metiendo la info y "value" que va contener el string que se esta metiendo como input
//y la funcionalidad de la funcion la crearemos en el archivo "Login.js"
//