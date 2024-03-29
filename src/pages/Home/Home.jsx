import React from 'react';
import { useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation, Switch } from 'react-router-dom';
import firebaseApp from './../../firebase/credentials'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import './Home1.css';
import { useEffect } from 'react';
import { HomeAdmin } from '../HomeAdmin/HomeAdmin';
import { HomeStudent } from '../HomeStudent/HomeStudent';
import { ADMIN, COURSE, NEWCOURSE, STUDENT } from '../../paths/pathsRoutes';
import { Course } from '../Course/Course';
import { useContext } from 'react';
import UserFromDB from '../../Context/UserFromDB';
import { AddCourse } from '../HomeAdmin/sub-pages/AddCourse/AddCourse';
import { NavbarUser } from '../../commons/Navbar/NavbarUser/NavbarUser';

export const Home = () => {

  //const firestore = getFirestore(firebaseApp);//contains the instance to the firestore service of our aplication firebase 
  
  const {userFromDB} = useContext(UserFromDB);
//dataUser = {userFromDB}

  return (
    <div className='home-style'>

      {(userFromDB?.rol === "admin") && 
          <HomeAdmin />
      }

      {(userFromDB?.rol === "student") && 
          <HomeStudent />
      }

    </div>
    
  );
};

 {/* <Routes>
       
          <Route path={ADMIN} element={<HomeAdmin dataUser = {userFromDB}/>} />
          <Route path={STUDENT} element={<HomeStudent dataUser = {userFromDB}/>} />
          <Route path={COURSE} element = {<Course />}  />
      </Routes> */}



// //000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// async function readUserDataFromDB(uidUser){//this function will read the user data fro the data base firestore

//   const refDoc = doc(firestore, `/Users/${uidUser}`);//we are obtaining the reference of the document according the specific user in firestore service
//   const userDocEncrypted = await getDoc(refDoc);//we obtained the specific document of the user requiring the document but in a encrypted mode
//   const userUncryptedData = userDocEncrypted.data()
//   const dataUserReturn = {
//     name: userUncryptedData.name, secName: userUncryptedData.secName, email: userUncryptedData.email, phone: userUncryptedData.phone,
//     adMeta: userUncryptedData.adMeta, pass: userUncryptedData.pass, rol: userUncryptedData.rol,
//   };
//   console.log("THE DATA UNCRYPTED IS: " + dataUserReturn);////////////////////////////////////
//   return dataUserReturn;
// }

// function readDataUserFromDB(uidUSER){

//   readUserDataFromDB(uidUSER).then((dataUserReturn) => {

//       const {name, secName, email, phone, adMeta, pass, rol} = dataUserReturn;
//       const userAutenticated = {
//           uidUser: uidUSER,
//           name: name, 
//           secName: secName,
//           email: email,
//           phone: phone,
//           adMeta: adMeta,
//           pass: pass,
//           rol: rol,
//       };
//           setUserFromDB(userAutenticated);
//           //console.log("THE DATA SAVED IN THE DB IS " + userAutenticated.secName);///////////////////////////////////////////////////////////
//       }).catch((error) => { 
//         console.log(error) 
//     });
// }

// useEffect(() => {
//   readDataUserFromDB(dataUser.uid);
// },[]);
 


//````````````````````````````````````````````````````````````````````````````````````````````````


{/*
 {(userFromDB?.rol === "admin") && <HomeAdmin dataUser = {userFromDB}/> }


*{userFromDB ? <p>THE DATA USER IS: {userFromDB.name} {userFromDB.phone} {userFromDB.rol} </p>: <p>LOADING DATA...</p>}
 */}

{/* <div className='home-style'>Home
  <Outlet/>
</div> */}
{ // readUserDataFromDB(userInFirebase.uid).then((dataUserReturn) => {
  //   const {name, secName, email, phone, adMeta, pass, rol} = dataUserReturn;
  //   const userAutenticated = {
  //       uidUser: userInFirebase.uid,
  //       name: name, 
  //       secName: secName,
  //       email: email,
  //       phone: phone,
  //       adMeta: adMeta,
  //       pass: pass,
  //       rol: rol,
  //   };
  //       setUserFromDB(userAutenticated);
  //       //console.log("THE DATA SAVED IN THE DB IS " + userAutenticated.secName);///////////////////////////////////////////////////////////
  //   }).catch((error) => { 
  //     console.log(error) 
  // });
  //setUserAuth(userInFirebase);
}