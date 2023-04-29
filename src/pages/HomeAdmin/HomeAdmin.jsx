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
import { NEWCOURSE } from '../../paths/pathsRoutes';
import { AddCourse } from './sub-pages/AddCourse/AddCourse';
import { FirstMain } from './sub-pages/FirstMain/FirstMain';


export const HomeAdmin = (  ) => {

    const {userFromDB} = useContext(UserFromDB);
    const [mainShown, setMainShown] = useState(true);
    const [addCourseShown, setAddCourseShown] = useState(false);
    const [watchResShown, setWatchResShown] = useState(false);
    const [watchCoursesShown, setWatchCoursesShown] = useState(false);
    const navigate = useNavigate();
    const [mainActive, setmainActive] = useState(true);
    const {pathname} = useLocation();
    


    function mainActivated(pasar){
        //console.log("LA INFO RECIBIDA FUE: ",pasar);
        setmainActive(pasar);
        console.log("LA INFO RECIBIDA FUE: ",mainActive);/////////////////////
    }
    
    function handlerClick(event){

        //console.log("THE DATA OF THE CHILDREN IS: "+ event);///////////////////////////////////
        if(event.target.id === "addCourse"){
            setMainShown(false);
            setAddCourseShown(true);
            //console.log(event.target.id);////////////////////////////////
            navigate(NEWCOURSE, {
                replace: true,
                state:{
                    logedIn:true,
                }
            });
        }
        // if((event.target.id === "back") && (addCourseShown === true)){
        //     setMainShown(true);
        //     setAddCourseShown(false);
        //     console.log(event.target.id);
        // }
    }

    useEffect(() => {
        //console.log("ONE BUTTON HAS BEEN CLICKED: "+mainShown);
        //console.log("THE MAIN SHOWN ITS: "+mainShown);
        // console.log("ADD COURSE IS: "+addCourseShown);
        // console.log("THE WATCH RESULT OF VOTING IS: "+watchResShown);
        // console.log("THE WATCH COURSES IS: "+ watchCoursesShown);
        if(!mainShown && pathname === "/home/*"){
            setMainShown(true);
            setAddCourseShown(false);
            setWatchCoursesShown(false);
            setWatchResShown(false);
        }
    },[pathname]);
  
  return (
    <div className='page-admin'>
        
        <aside>
            <h1>Hi {userFromDB?.name}!<br/><br/> Welcome to the voting system</h1>
            <div className='container-list'>
                <Lista adminData={userFromDB}/>
            </div>
        </aside>

        <main className='main-admin'>
            {mainShown && <>
                <br/>
                <Title textTitle="Please choice an option:" classType="title-Admin" />
                <br/>
                <br/>
                <Button idButton="addCourse" text="Create a new course" classButton="admin-main-buttons" handlerFunction={handlerClick}/>
                <br/>
                <br/>
                <Button idButton="watchRes" text="Watch results of a Course" classButton="admin-main-buttons" handlerFunction={handlerClick}/>
                <br/>
                <br/>
                <Button idButton="watchCourses" text="Watch Courses Added" classButton="admin-main-buttons" handlerFunction={handlerClick}/>
                <br/>
                <br/>
                <img src={votingPhoto} alt="Voting photo" />
            </>}
            {addCourseShown && <>
                <Routes>
                    <Route path={NEWCOURSE} element = {<AddCourse/>}  />
                </Routes>
            </>}
            
        </main>
    </div>
//     <Routes>
//     <Route path={NEWCOURSE} element = {<AddCourse/>}  />
// </Routes>
        
  )
}
// {addCourseShown && <Navigate to={NEWCOURSE} />}
//                     {watchResShown && <h1>SHOW VOTES RESULTS</h1>}
//                     {watchCoursesShown && <h1>SHOW ALL THE COURSES</h1>}



