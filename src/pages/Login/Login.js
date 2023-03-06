import React, {useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import './../../paths/pathsRoutes'
import { Title } from "./components/Title/Title";
import { Label } from "../../commons/Label/Label";
import { Input } from "../../commons/Input/Input";
import photoAzr from "./../../assets/images/azrieli.png";
import { Button } from "../../commons/Button/Button";
import { Link } from "react-router-dom";
import { HOME } from "./../../paths/pathsRoutes";



const Login = () => {

    const [user, setUser] = useState(" ");//Defining useState for the data user Loged in
    const [pass, setPassword] = useState(" ");//Defining useState for the data password Loged in
    const [passIncorrect, setPassIncorrect] = useState(false);//Defining useState that indicates whether the password is incorrect
    const [logedIn, setLogedIn] = useState(false);//This useState indicates the user is Loged in
    const [hasError, setHasError] = useState(false);//This useState indicates that has occured an error in the Login
    const navigate = useNavigate();
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
            if(params.user === "kokimoto" && params.pass == 123456){
                const {user, pass} = params;
            }
            else{
                setLogedIn(false);
                setHasError(true);
            }
        }
        else{
            setLogedIn(false);
            setHasError(true);
        }
    }

    function handlerClickAccess(){//When the button "Accesing" is pressed this function will happen 
        
        // if(typeof window.ethereum !== ""){
        //     return;
        // }
        const data = {user, pass};//In the data object will be saved the input that the User enter inthe format Object i.e: const data = pass: "1234", user:"korkimoto"
        if(data){
            ifMatch(data);
            setLogedIn(true);
            navigate(HOME,{
                replace: true,
                state: {
                    logedIn: true,
                    user,
                    pass,
                }
            });
        }
    }

    //console.log("El usuario es: "+ user);//==============================
    //console.log("The pass is: " + pass);//==============================

    return <div className = "loginContainer">
        <br/>
        <Title textTitle = 'Voting System Azrieli College'/>
        <br/>
        <Title textTitle = 'Welcome'/>
        {hasError && <label className="label-pass-error"><br/>The password or user are incorret.</label>}
        <br/>
        <br/>
        <Label text = 'User Name'/>
        {/*si cambiamos el atributo name:User por name:password entonces el hook useState del USER no se va a ejecutar porque la condicion name === "User" no se cumple*/}
        <Input atributte={{
            id: 'User',
            name:'User',
            placeHolder: 'Please type your name user',
            type:'text'
        }}
        handlerCh = {handlerChange}/>
        <br/>
        <Label text = 'Password'/>
        <Input atributte={{
            id: 'password',
            name:'passwordUser',
            placeHolder: 'Please type your password',
            type:'password'
        }} 
        handlerCh = {handlerChange}
        param = {passIncorrect} 
        />
        {passIncorrect && 
        <label className="label-pass-error">Invalid Password</label> }
        <br/>
        <Button to={HOME} text="Accessing" classButton="loginButton" handlerFunction={handlerClickAccess}/>
        <br/>
        <img src= {photoAzr} alt="Azrieli College photo"/>
    </div>
};

export default Login;
{/* <button className="loginButton" onClick={handlerClickAccess}>Accessing</button> */}

