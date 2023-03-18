import React from 'react';
import { useState } from 'react';

import { Link, Navigate, useNavigate } from 'react-router-dom'; //borrar
import { Button } from '../../commons/Button/Button';
import { Input } from '../../commons/Input/Input';
import { Label } from '../../commons/Label/Label';
import { HOME, LOGIN } from '../../paths/pathsRoutes';
import './Register.css';
import firebaseApp from './../../firebase/credentials';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';


export const Register = () => {

  const navigate = useNavigate();//borar/////////////////////////
  const auth = getAuth(firebaseApp);//contains an instance of the authentication firebase service
  const firestore = getFirestore(firebaseApp);//contains an instance of the firestore service.
  //const [isLoged, setIsLoged] = useState(false);

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
    registerUser();
    //console.log(isLoged);////////////////////////////////////////////////////
    //setLocalStorage();
    navigate(HOME, {
      replace: true,
      state: {
        logedIn: false,
      }
    });
    
  };

  const doNothing = () => {}

  // const setLocalStorage = () => {
  //   try{
  //   //console.log("EL VALOR BOOLEANO ES: "+isLoged );////////////////////////////////////////////////////
  //     window.localStorage.setItem("isLoged", false);
  //   }
  //   catch(error){
  //     console.error(error);
  //   }
  // }

  async function registerUser(){//This function will register an user in the authentication firebase service

    const currUser = await createUserWithEmailAndPassword(
    auth, values.studentEmail, values.password).then((userInFirebase) =>{return userInFirebase;});
    //"currUser" variable will contains our user that we had suscribed to the firebase service authentication mediantly the function
    //"createUserWithEmailAndPassword" and after we had a promise "then" taht will return us the user suscribed.
    
    console.log(currUser.user.uid);///////////////////////////////////////////////
    
    const docRef = doc(firestore, `Users/${currUser.user.uid}`);//contains the specific document from firestore wher we saved the data
    await setDoc(docRef, {name: values.studentName,secName: values.studentSurName, email: values.studentEmail, phone: values.studentPhone,
    adMeta: values.addressMetamask,pass: values.password, rol: "admin" });//here we write the data of the user in the database  
    signOut(auth);
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
            value: values.password,
          }}
          handlerCh = {handlerInput}
          className = {false} 
        />
        <br/>
        <br/>
        <Button to={LOGIN} text="Register" classButton="registerButton" typeButton="submit" handlerFunction={doNothing} />
        <br/>
        <br/>
      </form>
    </div>
  )
};
/*<div>Register
<Outlet/>
</div>*/