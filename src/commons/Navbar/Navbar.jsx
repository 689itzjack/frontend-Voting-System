import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { LOGIN, LOGOUT, REGISTER } from '../../paths/pathsRoutes'
import { Button } from '../Button/Button'
import './Navbar.css'

export const Navbar = () => {

  const handlerOnClick = () => {

  }

  const {state} = useLocation();
  //console.log("the user is logged in??" + state.logedIn);
  console.log("the user is logged in??" , state)

  return (
    <>
        <nav className='nav-page'>

            {
              state?.logedIn ? 
              <div className='buttons-private'>
                <span> {state?.user} </span>
                <Link to = {LOGOUT}><Button text="Logout" classButton="button-regular" handlerFunction={handlerOnClick}/></Link>
              </div>
              :
              <div className='buttons-public'>
              <Link to = {REGISTER}><Button text="Sign Up" classButton="button-regular" handlerFunction={handlerOnClick}/></Link>
              <Link to = {LOGIN}><Button text="Login" classButton="button-regular" handlerFunction={handlerOnClick}/></Link>
          </div>
            }

            
            
        </nav>
        <Outlet/>
    </>
    
    
  )
}
