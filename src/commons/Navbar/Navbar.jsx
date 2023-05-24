import React, { useState } from 'react'
import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { HOME, LOGIN, LOGOUT, REGISTER } from '../../paths/pathsRoutes'
import { Button } from '../Button/Button'
import firebaseApp from './../../firebase/credentials';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { DBProvider } from "./../../Context/UserFromDB";

import './Navbar.css'
import { useEffect } from 'react';
import { useContext } from 'react';
import UserFromDB from '../../Context/UserFromDB';
import { Home } from '../../pages/Home/Home';

export const Navbar = () => {

  const auth = getAuth(firebaseApp);//contains an instance of the authentication firebase service
  const navigate = useNavigate();//borrar//////////////////////////////////////
  const {userFromDB} = useContext(UserFromDB);
  const {state} = useLocation();
  const {pathname} = useLocation();
  const [currPage, setcurrPage] = useState("Login");
  const [typeUser, setTypeUser] = useState('');


  const inLogin = () => {
    setcurrPage("Login")
  }

  const inRegister = () => {
    setcurrPage("Register")
  }

  const logOut = () => {
    setcurrPage("Login");

    signOut(auth);
    navigate(LOGIN,{
      replace:true, 
      state: {
        logedIn: false,
      }
    });
  }

  const handler_Home = () => {
    navigate('/',{
      replace:true, 
      state: {
        logedIn: true,
      }
    });
  }

  
  useEffect(() => {

    //console.log(pathname)
    setTypeUser( userFromDB?.rol)
    //console.log("THE TYPE USER IS: ",typeUser);

  }, [typeUser,pathname]);
  
  return (
    <>
        <nav className='nav-page'  >

            {
              state?.logedIn ? 
              <>
                
                <div className='buttons-private-right'>
                  <span> {userFromDB?.name} </span>
                  <Button text="Logout" classButton="button-regular" handlerFunction={logOut}/>
                </div>
              
              </>
              
              :
              <div className='buttons-public'>
                {/*console.log("LA RUTA ES: "+ window.location.href)*/}
                {( window.location.href === "http://localhost:3000/login")? 
                  <Link to = {REGISTER}><Button text="Sign Up" classButton="button-regular" handlerFunction={inRegister}/></Link>
                  :
                  <Link to = {LOGIN}><Button text="Login" classButton="button-regular" handlerFunction={inLogin}/></Link>
                }
              </div>
            }
            
        </nav>
        
        <Outlet/>
    </>
  )
}