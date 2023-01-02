import React, {useState} from "react";
import './Login.css';
import { Title } from "./components/Title/Title";
import { Label } from "./components/Label/Label";
import { Input } from "./components/Input/Input";
import photoAzr from "./../../assets/images/azrieli.png";



const Login = () => {

    const [user, setUser] = useState(" ");//Defining useState
    const [pass, setPassword] = useState(" ");//Defining useState

    function handlerChange(name,value){//we will use on HOOKS
        if(name === "User"){
            setUser(value);
        }
        if(name === "passwordUser"){
            setPassword(value)
        }
    }

    function handlerClickAccess(){
        
        const data = {user,pass};
        console.log(data);
    }

    console.log("El usuario es: "+ user);
    console.log("The pass is: " + pass);

    return <div className = "loginContainer">
        
        <Title textTitle = 'Voting System Azrieli College'/>
        <br/>
        <Title textTitle = 'Welcome'/>
        <br/>
        <br/>
        <Label text = 'User Name'/>
        {/*si cambiamos el atributo name:User por name:password entonces el hook useState del USER no se va a ejecutar porque la condicion name === "User" no se cumple*/}
        <Input atributte={{
            id: 'User',
            name:'User',
            placeHolder: 'Please type a name user',
            type:'text'

        }}
        handlerCh = {handlerChange}/>
        <br/>
        <Label text = 'Password'/>
        <Input atributte={{
            id: 'password',
            name:'passwordUser',
            placeHolder: 'Please type a password',
            type:'password'
        }}
        handlerCh = {handlerChange}/>
        <br/>
        <button onClick={handlerClickAccess}>Accessing</button>
        <br/>
        <img src= {photoAzr} alt="Azrieli photo"/>
    </div>
};

export default Login;
