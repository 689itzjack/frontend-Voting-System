import React from 'react'
import './FirstMain.css'
import votingPhoto from '../../../../assets/images/Picture1.png'
import { Title } from '../../../../commons/Title/Title'
import { Button } from '../../../../commons/Button/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NEWCOURSE } from '../../../../paths/pathsRoutes'



export const FirstMain = ({clicked}) => {

    const [mainShown, setMainShown] = useState(false);
    const [addCourseShown, setAddCourseShown] = useState(false);
    const [watchResShown, setWatchResShown] = useState(false);
    const [watchCoursesShown, setWatchCoursesShown] = useState(false);
    const navigate = useNavigate();

    
    function handlerClick(event){
    
        if(event.target.id === "addCourse"){
            setMainShown(false);
            setAddCourseShown(true);
            console.log(event.target.id);
            navigate(NEWCOURSE,{replace: true});
        }
        if((event.target.id === "back") && (addCourseShown === true)){
            setMainShown(true);
            setAddCourseShown(false);
            console.log(event.target.id);
        }
        
    }
    


  return (
    <div className='main-admin'>
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
    </div>
  )
}
