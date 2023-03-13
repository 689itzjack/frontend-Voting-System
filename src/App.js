import React, { useEffect, useState } from "react";
import './App.css';
import Login from "./pages/Login/Login";

import {BrowserRouter, Routes, Route, useLocation, Navigate} from 'react-router-dom'
import { COURSE, HOME, LOGIN, LOGOUT, REGISTER } from "./paths/pathsRoutes";
import { Home } from "./pages/Home/Home";
import { Course } from "./pages/Course/Course";
//import { element } from "prop-types";
import { Navbar } from "./commons/Navbar/Navbar";
import { Register } from "./pages/Register/Register";
import { Errorpage } from "./commons/pageError/Errorpage";
//imports of firebase
import firebaseApp from './firebase/credentials';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";


export function App(){

    const auth = getAuth(firebaseApp);//contains an instance of the authentication firebase service
    const firestore = getFirestore(firebaseApp);//contains the instance to the firestore service of our aplication firebase 
    const [userAuth, setUserAuth] = useState(null);//saves if an user is logedin
    const [userFromDB, setUserFromDB] = useState(null);
    //const [userLoged, setUserLoged] = useState(false);


    // function getIfLogedUsr(){
    //     return localStorage.getItem('isLoged');
    // }

    


    onAuthStateChanged(auth, (userInFirebase) => {
    
        if(userInFirebase){
            //console.log("THE LOCAL STORAGE CONTAINER IS : " + window.localStorage.getItem('isLoged'));
            
            //setUserLoged(getIfLogedUsr());//use the local storage 
            //console.log("THE STATUS LOGIN OF THE USER IS : "+ userAuth); 
            
            //if(!userAuth){//&& !userFromDB

                //console.log(" the status of the user in App is: "+ userInFirebase)//////////////////
            
                
            //}
            //console.log("el usuario ha sido inscrito!!!"+  userInFirebase);//////////////////////////////////////
            //console.log(userAuth);
            setUserAuth(userInFirebase);

        }
        else{
            setUserAuth(null);
            //setUserFromDB(null);
            
            // console.log(userInFirebase);//////////////////////////////////////
            console.log(userAuth);///////////////////////////////////////////////
        }
    });//this function get 2 params. the first contains the instance to the authentication firebase system, the second
    //contains a function that recieve the event if the user exist. this function that listen to the event gets as parameter
    //the user that was authenticated.
    //infoUser={userAuth} 
    
    return <div className = "App">

        <BrowserRouter>
            <Routes>

                <Route path="/" element = {<Navbar/>} >
                    
                    <Route path = {LOGIN} element={<Login/>} />
                    <Route path={REGISTER} element={<Register/>} />

                    {(userAuth) ?
                        <Route exact path={HOME} element = {<Home dataUser={userAuth}/>}  >
                            <Route path={COURSE} element = {<Course/>}  />
                        </Route>
                        :
                        <Route path={HOME} element={<Navigate to={LOGIN}/>} ></Route>
                    }
                    
                </Route>
                <Route path="*" element={<Errorpage/>} /> 
            </Routes>
        </BrowserRouter>
        
    </div>
};
//<Route path={COURSE} element={<Course/>} />