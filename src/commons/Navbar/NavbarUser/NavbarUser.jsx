import { getAuth, signOut } from '@firebase/auth';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ADDED_COURSES, HOME, LOGIN, NEWCOURSE } from '../../../paths/pathsRoutes';
import miniPic from './../../../assets/images/azrieli.png'
import { Button } from '../../Button/Button';
import firebaseApp from './../../../firebase/credentials'
import { ethers } from "ethers";

import './NavbarUser.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export const NavbarUser = ({typeUser, clickedHome,mainSHown, userFromDB}) => {

  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);//contains an instance of the authentication firebase service
  const {pathname} = useLocation();
  const [shownList, setShownList] = useState(false);
  const runOnce = useRef(false);


/////////////////////////////////////////////HANDLER FUNCTIONS/////////////////////////////////////////////

  const logOut = () => {
    
    signOut(auth);
    navigate(LOGIN,{
      replace:true, 
      state: {
        logedIn: false,
      }
    });
  }

  const handler_Home = () => {

    clickedHome(false);
    if(typeUser === "student"){
      clickedHome(true);
    }
    
    navigate(HOME,{
      replace:true, 
      state: {
        logedIn: false,
      }
    });
  }

  const handler_NewCourse = () => {

    clickedHome(true);
    mainSHown(false);
    navigate(NEWCOURSE,{
      replace:true, 
      state: {
        logedIn: false,
      }
    });
  }

  const handler_Results = () => {

    clickedHome(true);
    mainSHown(false);
    navigate(ADDED_COURSES,{
      replace:true, 
      state: {
        logedIn: false,
      }
    });
  }
/////////////////////////////////////////////FUNCTIONS SOS/////////////////////////////////////////////

  async function checking_Address_Metamask(){

    if(window.ethereum !== "undefined"){
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();  
        if(userFromDB.adMeta !== signer.address){
            setShownList(false);
        }
        else{
            setShownList(true);
        }
    }
  }

  useEffect(() => {

    if(typeUser === "admin" && !runOnce.current){

      checking_Address_Metamask();
    }
      
    return () => {
      runOnce.current = true;
    }
  
  },[]);

  return (<>
    <nav className='nav-page-User'>

      {typeUser === 'student' ? 
      
        <>
          <div className='buttons-private-right'>
            <span> {userFromDB?.name} </span>
            <Button text="Logout" classButton="button-regular" handlerFunction={logOut}/>
          </div>

          <div className='buttons-private-left'>
            <img src={miniPic} alt='minipic' onClick={handler_Home}/>
            {pathname !== '/*' && 
              <Button text="Home" classButton="button-NavbarHome" handlerFunction={handler_Home}/>
            }
          </div>
          
        </>

        :

        <>
          <div className='buttons-private-right'>
            <span> {userFromDB?.name} </span>
            <Button text="Logout" classButton="button-regular" handlerFunction={logOut}/>
          </div>

          {shownList && 
          
            <div className='buttons-private-left'>
              <img src={miniPic} alt='minipic' onClick={handler_Home}/>
              <Button text="Home" classButton="button-NavbarHome" handlerFunction={handler_Home}/>
              <Button text="NewCourse" classButton="button-NavbarNewCourse" handlerFunction={handler_NewCourse}/>
              <Button text="Results" classButton="button-NavbarResults" handlerFunction={handler_Results}/>
            </div>
          
          }
          
        </>

      }
        
    </nav>
    
    </>
  )
}
