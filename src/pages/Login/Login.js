import React, {useContext, useEffect, useState} from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import './../../paths/pathsRoutes'
import { Title } from "../../commons/Title/Title";
import { Label } from "../../commons/Label/Label";
import { Input } from "../../commons/Input/Input";
import photoAzr from "./../../assets/images/azrieli.png";
import { Button } from "../../commons/Button/Button";
import firebaseApp from './../../firebase/credentials';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { ADMIN, HOME, STUDENT } from "./../../paths/pathsRoutes";
import { doc, getDoc } from "firebase/firestore";
import UserFromDB from "../../Context/UserFromDB";
import GetUserRol from "../../Context/GetUserRol";



const Login = () => {

    const [user, setUser] = useState(" ");//Defining useState for the data user Loged in
    const [pass, setPassword] = useState(" ");//Defining useState for the data password Loged in
    const [passIncorrect, setPassIncorrect] = useState(false);//Defining useState that indicates whether the password is incorrect
    const [hasError, setHasError] = useState(false);//This useState indicates that has occured an error in the Login
    const navigate = useNavigate();//borrar//////////////////////////////////////

    //these are the constants used for firebase services
    const auth = getAuth(firebaseApp);//contains an instance of the authentication firebase service
    const firestore = getFirestore(firebaseApp);//contains an instance of the firestore service.
    
    // const [userAuthenticatedCurr, setuserAuthenticatedCurr] = useState(null);
    // const [userAuthenticatedLast, setuserAuthenticatedLast] = useState(null);
    // const [userAuth, setUserAuth] = useState(null);
    // const [authPassed, setauthPassed] = useState(false);
    // const [theRol, settheRol] = useState("");

    //const {userRol} = useContext(GetUserRol);
    // const {state} = useLocation();
    
    function handlerChange(name,value){//we will use on HOOKS
        if(name === "User"){//if the name of the Input is User
            setUser(value);
            setHasError(false);
        }
        if(name === "passwordUser"){//if the name of the Input is passwordUser
            setHasError(false);
            if(value.length < 6){
                setPassIncorrect(true);
            }
            else{
                setPassIncorrect(false);
                setPassword(value);
            }
        }
    }

    function ifMatch(params){

        if(params.user.length > 0 && params.pass.length > 0){

            signInWithEmailAndPassword(auth, params.user, params.pass).then((userCurrent) => {
               
                navigate(HOME,{
                    replace: true,
                    state: {
                        logedIn: true,
                    }
                });//this navigate will transfer the state of the user if is loged or not to the Navbar for to select what buttons to show
                        
            }).catch((error) => {
                //setUserLoged(false);
                setHasError(true);
                console.log(error);/////////////////////////////////////////////////////////
            }); 
            
        }
        else{
            //setUserLoged(false);
            setHasError(true);
        }
    }

    function handlerClickAccess(){//When the button "Accesing" is pressed this function will happen 
        const data = {user, pass};//In the data object will be saved the input that the User enter inthe format Object i.e: const data = pass: "1234", user:"korkimoto"
        if(data){
            //setUserLoged(true);
            ifMatch(data);
        }
        
    }

// //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//                                      LEER EL ROL DEL USUARIO DESDE LA DB


// async function readUserDataFromDB(uidUser) {
//     //this function will read the user data fro the data base firestore

//     const refDoc = doc(firestore, `/Users/${uidUser}`); //we are obtaining the reference of the document according the specific user in firestore service
//     const userDocEncrypted = await getDoc(refDoc); //we obtained the specific document of the user requiring the document but in a encrypted mode
//     const userUncryptedData = userDocEncrypted.data();
//     settheRol(userUncryptedData.rol);
//     const dataUserReturn = {
//       rol: userUncryptedData.rol,
//     };
//     //console.log("THE DATA UNCRYPTED IN THE APP FILE IS (LINE 59): " + dataUserReturn.rol); ////////////////////////////////////
//     return dataUserReturn;
// }

// function readDataUserFromDB(uidUSER) {
//   readUserDataFromDB(uidUSER)
//     .then((dataUserReturn) => {
//       return dataUserReturn;
//       //console.log("THE DATA SAVED IN THE DB IS " + userAutenticated.secName);///////////////////////////////////////////////////////////
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

//                                  UTILIZA LA DATA OBTENIDA DE LA DB


    // function goToPage(rolUser){
    //     console.log("WE ARE INSIDE goToPage AND THE ROL IS : "+rolUser);
    //     if(rolUser === "student"){
    //         navigate(STUDENT,{
    //             replace: true,
    //             state: {
    //                 logedIn: true,
    //             }
    //         });//this navigate will transfer the state of the user if is loged or not to the Navbar for to select what buttons to show
    //     }
    //     if(rolUser === "admin"){
    //         navigate(ADMIN,{
    //             replace: true,
    //             state: {
    //                 logedIn: true,
    //                 user,
    //             }
    //         });//this navigate will transfer the state of the user if is loged or not to the Navbar for to select what buttons to show
    //     }
    // }


    //                              DEFINIENDO EL USE EFFECT DEL CODIGO


    // useEffect(() => {
    
    //     onAuthStateChanged(auth, (userInFirebase) => {

    //         if(userInFirebase){
    //             setUserAuth(userInFirebase);
    //         }
    //         else{
    //             setUserAuth(null);
    //             console.log(userAuth);///////////////////////////////////////////////
    //         }
    //     });
        
    //     readDataUserFromDB(userAuth);
    //     console.log("THE ROL IN USE EFFECT IS: "+ theRol);
    //     if(theRol){
    //         goToPage(theRol)
    //     }

    // },[userAuth,theRol]);
    

    
    return <div className = "loginContainer">
        <br/>
        <Title textTitle = 'Voting System Azrieli College' classType='titleLabel'/>
        <br/>
        <Title textTitle = 'Welcome' classType='titleLabel'/>
        {hasError && <label className="label-pass-error"><br/>The password or user are incorret.</label>}
        <br/>
        <br/>
        <Label text = 'User E-mail'/>
        {/*si cambiamos el atributo name:User por name:password entonces el hook useState del USER no se va a ejecutar porque la condicion name === "User" no se cumple*/}
        <Input atributte={{
            id: 'User',
            name:'User',
            placeHolder: 'Please type your e-mail User.',
            type:'text'
        }}
        handlerCh = {handlerChange}/>
        <br/>
        <Label text = 'Password'/>
        <Input atributte={{
            id: 'password',
            name:'passwordUser',
            placeHolder: 'Please type your password.',
            type:'password'
        }} 
        handlerCh = {handlerChange}
        param = {passIncorrect} 
        />
        {passIncorrect && 
        <label className="label-pass-error">Invalid Password</label> }
        <br/>
        <Button text="Accessing" classButton="loginButton" handlerFunction={handlerClickAccess}/>
        <br/>
        <div className="img-photoAzr">
            <img src= {photoAzr} alt="Azrieli College photo"/>
        </div>
    </div>
};

export default Login;

{/**useEffect(() => {

    onAuthStateChanged(auth, (userInFirebase) => {
        if(userInFirebase){
            setUserAuth(userInFirebase);
        }
        else{
            setUserAuth(null);
            console.log(userAuth);///////////////////////////////////////////////
        }
    });
    if (userAuth?.uid) {
        console.log("THE UID READ FROM THE CONTEXT FILE IS: "+ userAuth.uid);
        readDataUserFromDB(userAuth.uid);
    }
    else{
        console.log("The user are DISCONNECTED from the DB IN THE APP FILE (LINE 71)");
    }
    }, [userLoged]);*/}

















{/* <button className="loginButton" onClick={handlerClickAccess}>Accessing</button> */}
{// const setLocalStorage = () => {
    //     try{
    //     console.log("EL VALOR BOOLEANO ES: "+isLoged );////////////////////////////////////////////////////
    //         window.localStorage.setItem('isLoged', true);
    //         console.log("EL VALOR BOOLEANO ES: "+window.localStorage.setItem('isLoged', true));////////////////////////////////////////////////////
    //     }
    //     catch(error){
    //       console.error(error);
    //     }
    //   }
}
    

