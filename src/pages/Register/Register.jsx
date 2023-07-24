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
import { useEffect } from 'react';


export const Register = () => {

  const navigate = useNavigate();//borar/////////////////////////
  const auth = getAuth(firebaseApp);//contains an instance of the authentication firebase service
  const firestore = getFirestore(firebaseApp);//contains an instance of the firestore service.
  const [passError, setPassError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [existError, setExistError] = useState(true);



  const [values, setValues] = useState({
    studentName: "",
    studentSurName: "",
    studentEmail: "",
    pass: "",
    passwordReg2: "",
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
    setEmailError(false);
    setPassError(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    //console.log("THE ANSWER IS: ", answer);
    console.log("The value of the passwords is: ", values.pass.length , values.passwordReg2.length);

    if((values.pass?.length >= 6) && (values.passwordReg2?.length >= 6)){

      if((values.pass === values.passwordReg2)){
        console.log("THE PASWORD IS CORRECT");//]]]]]]]]]]]]]]]]]]]]]]]
        setPassError(false);
        registerUser();
      }
      else{
        setPassError(true);
        setExistError(true);
      }
    }
    else{
      setPassError(true);
      setExistError(true);
    }
  };

  const doNothing = () => {}

  async function registerUser(){//This function will register an user in the authentication firebase service

    const currUser = await createUserWithEmailAndPassword(
    auth, values.studentEmail, values.pass).then((userInFirebase) =>{
      console.log("USER CREATED!");//[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]
      setEmailError(false);
      return userInFirebase;
    }).catch((error) => {
      setEmailError(true);
      setExistError(true);
      console.log(error);//[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]
      console.log("The email is already in use!");//[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]

    });
    //"currUser" variable will contains our user that we had suscribed to the firebase service authentication mediantly the function
    //"createUserWithEmailAndPassword" and after we had a promise "then" taht will return us the user suscribed.
    
    //console.log(currUser.user.uid);///////////////////////////////////////////////
    //if(!emailError && !passError){

      const docRef = doc(firestore, `Users/${currUser.user.uid}`);//contains the specific document from firestore wher we saved the data
      await setDoc(docRef, {name: values?.studentName,secName: values.studentSurName, email: values.studentEmail, phone: values.studentPhone,
      adMeta: values.addressMetamask,pass: values.pass, rol: "student" });//here we write the data of the user in the database  
      //setEmailError(false);
      setExistError(false);
      signOut(auth);
    //}
    
  }

  useEffect(() => {
  
    if(emailError || passError){ 
      setExistError(true);
    }
    
    if(!existError){
      alert("The user "+values.studentName+"has been added sucessfully.")
      navigate(LOGIN, {
        replace: true,
        state: {
          logedIn: false,
        }
      });
    }

  }, [passError, emailError, existError]);
    

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
        {(emailError) && <span className='error-Pass'>The email is already in use, type another email.</span>}
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
          param = {emailError} 
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
            id: "pass",
            name: "pass",
            placeHolder: "Please write a password.",
            value: values.pass,
            type: "password",
          }}
          handlerCh = {handlerInput}
          className = {false} 
        />
        <br/>
        <br/>

        {(passError) && <span className='error-Pass'>The password not matched</span>}

        <Label text="Confirm Password"/>
        <Input 
          atributte={{
            id: "passwordReg2",
            name: "passwordReg2",
            placeHolder: "Please confirm the password.",
            value: values.passwordReg2,
            type: "password",
          }}
          handlerCh = {handlerInput}
          param = {passError} 
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