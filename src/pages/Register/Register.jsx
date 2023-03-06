import React from 'react';
import { useState } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom'; //borrar
import { Button } from '../../commons/Button/Button';
import { Input } from '../../commons/Input/Input';
import { Label } from '../../commons/Label/Label';
import { LOGIN } from '../../paths/pathsRoutes';
import './Register.css';

export const Register = () => {

  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);


  const [values, setValues] = useState({
    studentName: "",
    studentSurName: "",
    studentEmail: "",
    password: "",
    studentPhone: "",
    addressMetamask: "",
  });

  const handlerInput = (nameCurrInput, valueCurrInput) => {
    // const {name} = nameCurrInput;
    // const {value} = valueCurrInput;
    setValues({
      ...values,
      [nameCurrInput]: valueCurrInput,
      
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    //console.log(values);///////////////////////////////////////
    setLogged(true);

    navigate(LOGIN,{
      replace: true,
      state: {
        logged: true,
        values
      }
    });
  };
  const doNothing = () => {

  }

  return (
    <div className='registerForm-container'>
      <h1>Registration User</h1>

      <form onSubmit = {(event) => {submitForm(event)}}>
        <br/>
        <Label text="Student Name"/>
        <Input 
          atributte={{
            id: "studentName",
            name: "studentName",
            placeHolder: "Please enter your first name.",
            value: values.studentName,
          }}
          handlerCh = {handlerInput}
          className = {false} 
        />
        <br/>
        <br/>
        <Label text="Student Surname"/>
        <Input 
          atributte={{
            id: "studentSurName",
            name: "studentSurName",
            placeHolder: "Please enter your Surname.",
            value: values.studentSurName,
          }}
          handlerCh = {handlerInput}
          className = {false} 
        />
        <br/>
        <br/>
        <Label text="Student e-mail."/>
        <Input 
          atributte={{
            id: "studentEmail",
            name: "studentEmail",
            placeHolder: "Please enter your e-mail.",
            type: "email",
            value: values.studentEmail,
          }}
          handlerCh = {handlerInput}
          className = {false} 
        />
        <br/>
        <br/>
        <Label text="Student Phone"/>
        <Input 
          atributte={{
            id: "studentPhone",
            name: "studentPhone",
            placeHolder: "Please enter your number phone.",
            type: "tel",
            value: values.studentPhone,
          }}
          handlerCh = {handlerInput}
          className = {false} 
        />
        <br/>
        <br/>
        <Label text="Address Account Metamask"/>
        <Input 
          atributte={{
            id: "addressMetamask",
            name: "addressMetamask",
            placeHolder: "Please enter your address Metamask.",
            value: values.addressMetamask,
          }}
          handlerCh = {handlerInput}
          className = {false} 
        />
        <br/>
        <br/>
        <Label text="Password"/>
        <Input 
          atributte={{
            id: "password",
            name: "password",
            placeHolder: "Please write a password.",
            value: values.paswword,
          }}
          handlerCh = {handlerInput}
          className = {false} 
        />
        <br/>
        <br/>
        <Button to={LOGIN} text="Register" classButton="registerButton" typeButton="submit" handlerFunction={doNothing}/>
        <br/>
        <br/>
      </form>
    </div>
  )
};
/*<div>Register
<Outlet/>
</div>*/