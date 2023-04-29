import React from 'react'
import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Button } from '../../../../commons/Button/Button'
import { Label } from '../../../../commons/Label/Label'
import { Title } from '../../../../commons/Title/Title'
import { HOME } from '../../../../paths/pathsRoutes'
import { Inputs } from '../../components/Inputs/Inputs'
import { HomeAdmin } from '../../HomeAdmin'
import './AddCourse.css'
import { Contract, ContractFactory, ethers } from "ethers"
import createVote from '../../../../artifacts/contracts/createVote.sol/createVote.json'
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import firebaseApp from '../../../../firebase/credentials'



export const AddCourse = () => {

  const navigate = useNavigate();
  const [showFields, setshowFields] = useState(true);
  const [addressContract, setaddressContract] = useState("");
  const auth = getAuth(firebaseApp);//contains an instance of the authentication firebase service
  const firestore = getFirestore(firebaseApp);//contains an instance of the firestore service.


  const [values, setValues] = useState({
    nameCourse: "",
    idCourse: "",
    first: "",
    second: "",
  });

  //////////////////////////////////////////FUNCTIONS=========================================

  function registerUser(addressContract){//This function will register an user in the authentication firebase service
    // console.log(currUser.user.uid);///////////////////////////////////////////////
    
    const docRef = doc(firestore, `Courses/${values.nameCourse}`);//contains the specific document from firestore wher we saved the data
    setDoc(docRef, {idCourse: values.idCourse, adressCourse: addressContract,});//here we write the data of the user in the database  
  }

  const deploy_Contract = async (arrayDates) => {//this function deploys a contract by the user
    let provider;
    let signer = null;
    //let addressContract;/////////////////////////////////////////
    
    if(window.ethereum !== "undefined"){
      
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();     
      console.log("THE ADDRESS OF THE CURRENT USER IS: ",signer.address);////////////////////////////////////// 
      
      const factory = new ContractFactory(createVote.abi, createVote.bytecode, signer);      
      const contract = await factory.deploy(arrayDates, parseInt(values.idCourse), values.nameCourse);      

      await contract.getAddress().then((address) => {
        //setaddressContract(address);///////////////////////////////////////
        console.log("The contract address is: "+address);///////////////////////////////////////////////////////
        registerUser(address);
        navigate(HOME, {
          replace: true,
          state:{
              logedIn:true,
          }
        });
      }).catch((error) => {
        console.log(error);
        // navigate(HOME, {
        //   replace: true,
        //   state:{
        //       logedIn:true,
        //   }
        // });
      });
      //await contract.waitForDeployment();

    }
  }
  
  function handlerClickCreate(event){
    
    event.preventDefault();
    let arrDates;
    arrDates = create_List_Dates();
    deploy_Contract(arrDates);    
  }

  function handlerInputChange(nameCurrInput, valueCurrInput){
    setValues({
      ...values,
      [nameCurrInput]: valueCurrInput,
    });
    //console.log(nameCurrInput,  valueCurrInput)//////////////////////////////////////
  }

  function handlerClickBack(){
      setshowFields(false);
      navigate(HOME, {
        replace: true,
        state:{
            logedIn:true,
        }
      });
  }

  function make_Date(str){// this function convert the date put in by the user to the format dd/mm/yyyy

    let year = "";
    let month = "";
    let day = "";

    let index = 0;
    let guion = 0;
    for(index; index < str.length ; index++){

      if(str[index] == '-'){
        guion +=1;
        continue;
      }
      if(guion == 0){
        year += str[index];
      }
      if(guion == 1){
        month += str[index];
      }
      if(guion == 2){
        day += str[index];
      }
    }
    const newDate = day +'/'+ month +'/'+ year;
    return newDate;
  }

  function create_List_Dates(){//this function creates the array of the dates to be used by the smart contract 
    let arrayDates = [];
    let date1 = make_Date(values.first);
    
    arrayDates.push(date1);
    //console.log("THE FIRSTE DATE "+date1);/////////////////////////////////////
    if(values.second){
      let date2 = make_Date(values.second);
      //console.log("THE SECOND DATE "+date2);/////////////////////////////////////
      arrayDates.push(date2);
    }
    if(values.third){
      let date3 = make_Date(values.third);
      //console.log("THE SECOND DATE "+date2);/////////////////////////////////////
      arrayDates.push(date3);
    }

    return arrayDates;
  }

  function handlerClick(){}


  return (

    <div className='page-addCourse'>

        {showFields &&
          <form onSubmit={(event) => {handlerClickCreate(event)}}>
            <br/>
            <Title textTitle="Adding a new Course" classType="title-addCourse" />
            <br/>
            <br/>
            <div className='container-dates'>
              <Label text="Name Course" classLabel="addCourse-Inputs"/>
              <Inputs atributte={{
                id: "nameCourse",
                name: "nameCourse",
                placeHolder: "Please add the name of the course",
                type:'text',
                }} 
                handlerCh = {handlerInputChange}
                clase = "admin-addCourse"
              />
              <br/>
              <br/>
              <br/>
              <Label text="Id Course" classLabel="addCourse-Inputs"/>
              <Inputs atributte={{
                id: "idCourse",
                name: "idCourse",
                placeHolder: "Please enter the id of the course",
                type:'number',
                }} 
                handlerCh = {handlerInputChange}
                clase = "admin-addCourse"
              />
              <br/>
              <br/>
              <br/>
              <Label text="First date" classLabel="addCourse-Inputs"/>
              <Inputs atributte={{
                id: "first",
                name: "first",
                placeHolder: "Enter a date in format dd/mm/yy",
                type:'date',
                }} 
                handlerCh = {handlerInputChange}
                clase = "admin-addCourse"
              />
              <br/>
              <br/>
              <br/>
              <Label text="Second date" classLabel="addCourse-Inputs"/>
              <Inputs atributte={{
                id: "second",
                name: "second",
                placeHolder: "Enter a date in format dd/mm/yyyy",
                type:'date',
                }} 
                handlerCh = {handlerInputChange}
                clase = "admin-addCourse"
              />    
              <br/>
              <br/>
              <br/>
              <Label text="Third date (Optional)" classLabel="addCourse-Inputs"/>
              <Inputs atributte={{
                id: "third",
                name: "third",
                placeHolder: "Enter a date in format dd/mm/yyyy",
                type:'date',
                }} 
                handlerCh = {handlerInputChange}
                clase = "admin-addCourse"
              />

            </div> 
            <br/>
            <br/>
            <div className='admin-containerAddButtons'>
              <Button idButton="back" text="< back" classButton="button-regular" handlerFunction={handlerClickBack}  />
              <Button idButton="create" text="Create +" typeButton="submit" classButton="admin-addCourseButton" handlerFunction={handlerClick}  />
            </div>
            <br/>
            <br/>
          </form>
          
        }
    </div>
  )
}
//async function create_Course(){
    
  //   if(window.ethereum !== 'undefined'){
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);//we her obtain the provider web3
  //     const contract = new ethers.Contract()


  //   }

  // }



  // function handlerClickCreate(event){

  //     if(event.target.id === "addCourse"){
  //         setMainShown(false);
  //         setAddCourseShown(true);
  //         console.log(event.target.id);
          
  //     }
  //     if((event.target.id === "back") && (addCourseShown === true)){
  //         setMainShown(true);
  //         setAddCourseShown(false);
  //         console.log(event.target.id);
  //     }
  // }