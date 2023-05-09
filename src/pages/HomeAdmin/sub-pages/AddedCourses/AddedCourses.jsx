import React from 'react';
import { useState } from 'react';
import './AddedCourses.css';
import firebaseApp from './../../../../firebase/credentials';
import { collection, getDocs, getFirestore } from '@firebase/firestore';
import { useEffect } from 'react';
import { Title } from '../../../../commons/Title/Title';
import { Button } from '../../../../commons/Button/Button';
import { Modal } from '../../../../commons/Modals/Modal';

export const AddedCourses = () => {

    const [allCourses, setAllCourses] = useState([]);
    const [modalOpened, setModalOpened] = useState(false);
    const [addrCourse, setAddrCourse] = useState('');

//////////////////////////////////////////////////////////// HANDLER FUNCTIONS ////////////////////////////////////////////////////////////

function handle_Click_Courses(evento){

    console.log("THE DATA IS: ", evento.target.value);
    setAddrCourse(evento.target.value);
    setModalOpened(true);

}

//////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////


    // function read_From_DB(){
    //     if(allCourses)
    //         console.log("THE DATA IS: ", allCourses);
    // }
//////////////////////////////////////////////////////////// USEEFFECT ////////////////////////////////////////////////////////////
    
    useEffect(() => {//this useeffect charge all the data of the existing courses from the 
        const firestore = getFirestore(firebaseApp);//I am creating an instance of the firestore service app
        const courses_collection = collection(firestore, 'Courses');
        getDocs(courses_collection).then((res) => {
          setAllCourses(res.docs.map(course => (
            {id: course.id, ...course.data(),}
          )));
        });
      },[])
      
  return (
    <div className='container-AddedCourses'>
        <Title textTitle="Push on a course to see the voting results " classType='admin-addedCourses'/>
        <br/>
        <br/>
        {allCourses.map((course, ind) => {
           
            return (
                <div key={ind}>
                    <Button idButton={course.idCourse} classButton='admin-addedCoursesButtons' text={course.id+'   '+course.idCourse} theValue={course.adressCourse} handlerFunction={handle_Click_Courses} />
                    <br/>
                    <br/>
                </div>
            )
        })}

        <Modal opened={modalOpened} closeModal={setModalOpened} addr={addrCourse}/>
    </div>
  )
}
