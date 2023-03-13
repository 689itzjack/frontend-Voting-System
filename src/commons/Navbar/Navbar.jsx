import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN, LOGOUT, REGISTER } from '../../paths/pathsRoutes'
import { Button } from '../Button/Button'
import firebaseApp from './../../firebase/credentials';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import './Navbar.css'

export const Navbar = () => {

  const auth = getAuth(firebaseApp);//contains an instance of the authentication firebase service
  const navigate = useNavigate();//borrar//////////////////////////////////////
  //const [loged, setLoged] = useState(window.localStorage.getItem('isLoged'));
  //console.log(loged);//////////////////////////////////////////

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

  const {state} = useLocation();
  const [currPage, setcurrPage] = useState("Login");
  //const [userLogged, setUserLogged] = useState(false)
  //console.log("the user is logged in??" + state.logedIn);
  //console.log("the user is logged in??" , state)

  return (
    <>
        <nav className='nav-page'>

            {
              state?.logedIn ? 
              <div className='buttons-private'>
                <span> {state?.user} </span>
                <Button text="Logout" classButton="button-regular" handlerFunction={logOut}/>
              </div>
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
//currPage === "Login"