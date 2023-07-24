import React, { useContext, useEffect, useState } from "react";
import './App.css';
import Login from "./pages/Login/Login";

import {BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate} from 'react-router-dom'
import { ADMIN, COURSE, HOME, LOGIN, LOGOUT, REGISTER, STUDENT } from "./paths/pathsRoutes";
import { Home } from "./pages/Home/Home";
import { Course } from "./pages/Course/Course";
//import { element } from "prop-types";
import { Navbar } from "./commons/Navbar/Navbar";
import { Register } from "./pages/Register/Register";
import { Errorpage } from "./commons/pageError/Errorpage";
//imports of firebase
import firebaseApp from './firebase/credentials';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { DBProvider } from "./Context/UserFromDB";
import { HomeAdmin } from "./pages/HomeAdmin/HomeAdmin";
import { HomeStudent } from "./pages/HomeStudent/HomeStudent";
import { UserRolProvider } from "./Context/GetUserRol";
import UserFromDB from './Context/UserFromDB';
import { ErrorLogedin } from "./commons/pageError/ErrorLogedin";



export function App(){

    const auth = getAuth(firebaseApp);//contains an instance of the authentication firebase service
    const firestore = getFirestore(firebaseApp);//contains the instance to the firestore service of our aplication firebase 
    const [userAuth, setUserAuth] = useState(null);//saves if an user is logedin
    //const [pathBefore, setPathBefore] = useState("");
    const [currpath, setCurrpath] = useState();
    //const {pathname} = useLocation();



    // const {userFromDB} = useContext(UserFromDB);
    // console.log("THE CONTEXT DB IS: ", userFromDB);
    //const [userLoged, setUserLoged] = useState(false);

    // function getIfLogedUsr(){
    //     return localStorage.getItem('isLoged');
    // }



    // useEffect(() => {

    //     setCurrpath(window.location.href);
    //     console.log("THE CURR PATH IS: ", currpath);
    //     // if(userAuth && currpath !== "http://localhost:3000/login"){

    //     // }


    // },[currpath]);

    onAuthStateChanged(auth, (userInFirebase) => {
    
        if(userInFirebase){
            setUserAuth(userInFirebase);
        }
        else{
            setUserAuth(null);
            console.log(userAuth);///////////////////////////////////////////////
        }
    });//this function get 2 params. the first contains the instance to the authentication firebase system, the second
    //contains a function that recieve the event if the user exist. this function that listen to the event gets as parameter
    //the user that was authenticated.
    //infoUser={userAuth} 



    return <div className = "App">

        <BrowserRouter>
            <Routes>

                <Route path="/" element = {<DBProvider><Navbar/></DBProvider>} >

                    <Route path = {LOGIN} element={<Login/>} />
                    <Route path={REGISTER} element={<Register/>} />
                    
                </Route>
                
                    {(userAuth) ?

                        <Route exact path={HOME} element = {<DBProvider><Home /></DBProvider>} />   

                        :
                        
                        <Route path={LOGOUT} element={<Navigate to={LOGIN}/>} />
                    }
                    <Route path='*' element={<Errorpage />} />
                
                
            
            </Routes>
        </BrowserRouter>
        
    </div>
};

{/**

//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    async function readUserDataFromDB(uidUser) {
        //this function will read the user data fro the data base firestore
    
        const refDoc = doc(firestore, `/Users/${uidUser}`); //we are obtaining the reference of the document according the specific user in firestore service
        const userDocEncrypted = await getDoc(refDoc); //we obtained the specific document of the user requiring the document but in a encrypted mode
        const userUncryptedData = userDocEncrypted.data();
        const dataUserReturn = {
          rol: userUncryptedData.rol,
        };
        console.log("THE DATA UNCRYPTED IN THE APP FILE IS (LINE 59): " + dataUserReturn.rol); ////////////////////////////////////
        return dataUserReturn;
      }
    
      function readDataUserFromDB(uidUSER) {
        readUserDataFromDB(uidUSER)
          .then((dataUserReturn) => {
            setRolUser(dataUserReturn.rol);
            //console.log("THE DATA SAVED IN THE DB IS " + userAutenticated.secName);///////////////////////////////////////////////////////////
          })
          .catch((error) => {
            console.log(error);
          });
      }
    
      useEffect(() => {
        if (userAuth?.uid) {
            console.log("THE UID READ FROM THE CONTEXT FILE IS: "+ userAuth.uid);
            readDataUserFromDB(userAuth.uid);
        }
        else{
            console.log("The user are DISCONNECTED from the DB IN THE APP FILE (LINE 80)");
        }
      }, [userAuth]);

*/}





{/* <>
    {(rolUser === "student") ? 
        <Route exact path={STUDENT} element = {<DBProvider><HomeStudent/></DBProvider>}>
            <Route path={COURSE} element = {<Course />}  />
        </Route>
        :
        <Route exact path={ADMIN} element = {<DBProvider><HomeAdmin/></DBProvi
        </Route>
    } 
</> */}






//<Route path={COURSE} element={<Course/>} />

//console.log("THE LOCAL STORAGE CONTAINER IS : " + window.localStorage.getItem('isLoged'));
            
            //setUserLoged(getIfLogedUsr());//use the local storage 
            //console.log("THE STATUS LOGIN OF THE USER IS : "+ userAuth); 
            
            //if(!userAuth){//&& !userFromDB

                //console.log(" the status of the user in App is: "+ userInFirebase)//////////////////
            
                
            //}
            //console.log("el usuario ha sido inscrito!!!"+  userInFirebase);//////////////////////////////////////
            //console.log(userAuth);