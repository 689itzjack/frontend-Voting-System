import React from 'react'
import { Button } from '../../../../commons/Button/Button'
import './Listcourses.css'
import firebaseApp from './../../../../firebase/credentials'
import { collection, getFirestore } from 'firebase/firestore'
import { doc, getDocs } from "firebase/firestore";
import { useEffect } from 'react'
import { useState } from 'react'
import { Route, Router, Routes, useLocation, useNavigate } from 'react-router-dom'
import { COURSE } from '../../../../paths/pathsRoutes'
import { IssueVote } from '../../subpages/IssueVote/IssueVote'



export const Listcourses = ({buttonClickedFather, dataButton}) => {
  const [dataCourses, setDataCourses] = useState([]);
  const [shownList, setShownList] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const {pathname} = useLocation();

  
  useEffect(() => {
    const firestore = getFirestore(firebaseApp);//I am creating an instance of the firestore service app
    const courses_collection = collection(firestore, 'Courses');
    getDocs(courses_collection).then((res) => {
      setDataCourses(res.docs.map(course => (
        {id: course.id, ...course.data(),}
      )));
    });
  },[])

  function course_Selected(evento){
    //console.log("THE EVENT CONTAINS: ",evento);//................................................
    //console.log("THE DATA FORM THE PUSHED BUTTON IS: \n","Course: "+evento.target.name,"Id Course: "+evento.target.id," Address: "+evento.target.value)
    //console.log("THE BUTTON HAS BEEN PRESSED");//[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]
    buttonClickedFather(true);
    dataButton({nameCourse: evento.target.name, idCourse:evento.target.id, addrCourse: evento.target.value});
  }

  return (
    <>
      <div className='the-list'>
        {dataCourses.map((currCourse) => {
          //console.log("THE DATA COURSE IS : ","ID: "+currCourse.id,"NAME COURSE: "+currCourse.idCourse,"ADDRESS: "+currCourse.adressCourse);
          return (
            <div key={currCourse.id}>
              <Button idButton={currCourse.idCourse} name={currCourse.id} text={'Course: '+currCourse.id+"    Id Course: "+currCourse.idCourse} theValue={currCourse.adressCourse} classButton="buttonStudent-Course" handlerFunction={course_Selected}/>
              <br/>
              <br/> 
            </div>
          );
        })}
      </div>
      
    </>
    
    


  );
}
//{id: currCourse.id, idCourse: currCourse.idCourse, adressCourse: currCourse.adressCourse}