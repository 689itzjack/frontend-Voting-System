import React from 'react'
import { Lista } from '../../commons/lista/Lista'
import './HomeAdmin.css';
import '../../commons/lista/Lista.css'
import { Button } from '../../commons/Button/Button';
import { Title } from '../../commons/Title/Title';
import votingPhoto from '../../assets/images/Picture1.png'
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import UserFromDB from '../../Context/UserFromDB';
import { useState } from 'react';
import { ADDED_COURSES, ERROR404_NOPAGE, NEWCOURSE, RES_COURSE } from '../../paths/pathsRoutes';
import { AddCourse } from './sub-pages/AddCourse/AddCourse';
import { ethers } from "ethers";
// import asidePic from './../../assets/images/voting.png'

//import { FirstMain } from './sub-pages/FirstMain/FirstMain';
import { useRef } from 'react';
import { ErrorLogedin } from '../../commons/pageError/ErrorLogedin';
//import { ResultofCourse } from './sub-pages/ResultCourse/ResultofCourse';
import { AddedCourses } from './sub-pages/AddedCourses/AddedCourses';
import { NavbarUser } from '../../commons/Navbar/NavbarUser/NavbarUser';


export const HomeAdmin = () => {

    const {userFromDB} = useContext(UserFromDB);
    const [mainShown, setMainShown] = useState(true);
    const [goToPage, setGoToPage] = useState(false);
    //const [watchResShown, setWatchResShown] = useState(false);
    //const [watchCoursesShown, setWatchCoursesShown] = useState(false);
    const [correctAddress, setCorrectAddress] = useState(false);
    const [clickedButton, setClickedButton] = useState(false);
     
    const runOnce = useRef(false);

    const navigate = useNavigate();
    const {pathname} = useLocation();

///////////////////////////////////////////// FUNCTIONS SOS ///////////////////////////////////////////// 

    // function checking_Path(){

    //     if( || pathname === RES_COURSE || pathname === ADDED_COURSES){
    //         return true;
    //     }
    //     return false;
    // }

///////////////////////////////////////////// FUNCTIONS METAMASK ///////////////////////////////////////////// 

    async function checking_Address_Metamask(){

        if(window.ethereum !== "undefined"){
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();  
            if(userFromDB.adMeta !== signer.address){
                alert("Dear User, Please active your Metamask account and then, refresh the page.");
            }
            else{
                setCorrectAddress(true);
            }
        }
    }

///////////////////////////////////////////// HANDLERS FUNCTIONS ///////////////////////////////////////////// 


    function handlerClick(event){

        //console.log("THE DATA OF THE CHILDREN IS: "+ event);///////////////////////////////////
        if(event.target.id === "addCourse"){
            setClickedButton(true);
            setMainShown(false);
            navigate(NEWCOURSE, {
                replace: true,
                state:{
                    logedIn:true,
                }
            });
        }
        if(event.target.id === "watchAddedCourses"){
            setClickedButton(true);
            setMainShown(false);
            navigate(ADDED_COURSES, {
                replace: true,
                state:{
                    logedIn:true,
                }
            });
        }
        
    }

///////////////////////////////////////////// useEffect HOOKS  ///////////////////////////////////////////// 

    useEffect(() => {

        if(!runOnce.current){
            checking_Address_Metamask();
        }

        return () => {
            runOnce.current = true;
        }
    },[correctAddress])

    useEffect(() => {
        //console.log("ONE BUTTON HAS BEEN CLICKED: "+mainShown);
        //console.log("THE MAIN SHOWN ITS: "+mainShown);
        // console.log("ADD COURSE IS: "+addCourseShown);
        // console.log("THE WATCH RESULT OF VOTING IS: "+watchResShown);
        // console.log("THE WATCH COURSES IS: "+ watchCoursesShown);

        if(pathname !== "/*" && !clickedButton){
            setMainShown(false); 
            //checking_Path()
            //console.log("THE CURRENT PATH IS: ", pathname);//[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]
            if(pathname === NEWCOURSE){
                setClickedButton(true);
                navigate(NEWCOURSE, {
                    replace: true,
                    state:{
                        logedIn:true,
                    }
                });

            }
            
            else if(pathname === ADDED_COURSES){
                setClickedButton(true);
                navigate(ADDED_COURSES, {
                    replace: true,
                    state:{
                        logedIn:true,
                    }
                });
            }
            else{
                navigate(ERROR404_NOPAGE, {
                    replace: true,
                    state:{
                        logedIn:true,
                    }
                });
            }
        }
        
        if(!mainShown && pathname === "/*"){
            setClickedButton(false);
            setMainShown(true);
            //setWatchCoursesShown(false);
            //setWatchResShown(false);
        }
        
        
    },[pathname, clickedButton]);
////////////////////////////////////////////////////////////////////////////////////////// 

  
  return (
    <div className='page-admin'>
        <NavbarUser typeUser="admin" clickedHome={setClickedButton} mainSHown={setMainShown} userFromDB={userFromDB} />
        <aside>
            <br />
            <h1>Hi {userFromDB?.name}!<br/><br/> Welcome to the voting system</h1>
            <div className='container-list'>
                <Lista adminData={userFromDB}/>
            </div>
            {/* <img id='img-aside-Photo' src={asidePic} alt="aside photo" /> */}
        </aside>

        <main className='main-admin'>

            {(mainShown && correctAddress) && 
            
                <div className='Menu'>
                    <br/>
                    <Title textTitle="Dear Admin, Please choice an option:" classType="title-Admin" />
                    <br/>
                    <br/>
                    <Button idButton="addCourse" text="Create a new course" classButton="admin-main-buttons" handlerFunction={handlerClick}/>
                    <br/>
                    <br/>
                    <Button idButton="watchAddedCourses" text="Watch Added Courses" classButton="admin-main-buttons" handlerFunction={handlerClick}/>
                    <br/>
                    <br/>
                    <img id='img-votingPhoto' src={votingPhoto} alt="Voting photo" />
                </div>
            }
            
            {(clickedButton && !mainShown) &&
            
                <Routes>
                    <Route path={NEWCOURSE} element = { <AddCourse />}  />
                    <Route path={ADDED_COURSES} element = { <AddedCourses />}  />
                    <Route path={ERROR404_NOPAGE} element = { <ErrorLogedin message="Page not Found" />}  />
                </Routes>
            
            }
            
            
        </main>
    </div>

        
  )
}