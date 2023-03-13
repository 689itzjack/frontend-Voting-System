import React, {useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import './../../paths/pathsRoutes'
import { Title } from "./components/Title/Title";
import { Label } from "../../commons/Label/Label";
import { Input } from "../../commons/Input/Input";
import photoAzr from "./../../assets/images/azrieli.png";
import { Button } from "../../commons/Button/Button";
import firebaseApp from './../../firebase/credentials';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { HOME } from "./../../paths/pathsRoutes";




const Login = () => {

    //console.log("THE INFO CURRENT USER: "+ infoUser);

    const [user, setUser] = useState(" ");//Defining useState for the data user Loged in
    const [pass, setPassword] = useState(" ");//Defining useState for the data password Loged in
    const [passIncorrect, setPassIncorrect] = useState(false);//Defining useState that indicates whether the password is incorrect
    //const [userLoged, setUserLoged] = useState(false);//This useState indicates the user is Loged in
    const [hasError, setHasError] = useState(false);//This useState indicates that has occured an error in the Login
    const navigate = useNavigate();//borrar//////////////////////////////////////

    //these are the constants used for firebase services
    const auth = getAuth(firebaseApp);//contains an instance of the authentication firebase service
    const firestore = getFirestore(firebaseApp);//contains an instance of the firestore service.
    
    
    // const {state} = useLocation();
    // console.log("THIS IS THE STATE",  state);///////////////////////////////////
    // console.log("The student name is:" + state.values.studentName)
    //console.log("The student Surname is:" + state.values.studentSurName)

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

            signInWithEmailAndPassword(auth, params.user, params.pass).then(() => {
                //setUserLoged(true);
                //console.log("THE USER LOGED IS!!!: "+ userLoged);///////////////////////////////
                const {user, pass} = params;
                //setLocalStorage();

                navigate(HOME,{
                    replace: true,
                    state: {
                        logedIn: true,
                        user,
                        pass,
                    }
                });//this navigate will transfer the state of the user if is loged or not to the Navbar for to select what buttons to show

            }).catch((error) => {
                //setUserLoged(false);
                setHasError(true);
                console.log(error);/////////////////////////////////////////////////////////

            }); 
            //console.log("THE USER DATA IS:" + auth);//////////////////////////////////////
            

            //if(params.user === "kokimoto" && params.pass == 123456){
            //    const {user, pass} = params;
            //    setLogedIn(true);
            //        navigate(HOME,{
            //            replace: true,
            //            state: {
            //                logedIn: true,
            //                user,
            //                pass,
            //            }
            //        });
            //}
            // else{
            //     setLogedIn(false);
            //     setHasError(true);
            // }
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

    
    return <div className = "loginContainer">
        <br/>
        <Title textTitle = 'Voting System Azrieli College'/>
        <br/>
        <Title textTitle = 'Welcome'/>
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
        <img src= {photoAzr} alt="Azrieli College photo"/>
    </div>
};

export default Login;
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
    

