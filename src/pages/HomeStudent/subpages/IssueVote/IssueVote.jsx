import { async } from '@firebase/util';
import React from 'react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Title } from '../../../../commons/Title/Title';
import { ethers, Contract, toNumber } from "ethers";
import interface_Contract from './../../../../artifacts/contracts/createVote.sol/createVote.json'
import './IssueVote.css';
import { useState } from 'react';
import { Button } from '../../../../commons/Button/Button';
import { HOME } from '../../../../paths/pathsRoutes';


//  console.log();

export const IssueVote = ({backButton}) => {

    const runOnce = useRef(false);
    const {nameCourse, idCourse, addrCourse} = useParams();
    const [datesFromBC, setDatesFromBC] = useState(null);//save all the dates to vote 
    const [studentCreated, setStudentCreated] = useState(false);//save if the student has been created in the BC
    const [student_Voted, setStudent_Voted] = useState(false);//save if the student has voted
    const [closeVotation, setCloseVotation] = useState(false);//save if the votation has been closed because the contract course has expired
    const [show_Buttons, setShow_Buttons] = useState(false);//if we select a course, show the confirmation buttons
    const [chosenDate, setChosenDate] = useState("");//save the date that the user is selecting now
    const [timeContract, setTimeContract] = useState(0);//save the time expiration contract in millisecs  
    const [votedDate, setVotedDate] = useState("");
    const [expiration, setExpiration] = useState(null);
    const [dateWinner, setDateWinner] = useState('');
    //const [numVotersWin, setNumVotersWin] = useState(0);

    const navigate = useNavigate();


    ////////////////////////////////////////////// HANDLERS CLICKS //////////////////////////////////////////////////
    function handlerClickHome(){//HANDLES THE HOME BUTTON CLICK
      //setshowFields(false);
      backButton(true);
      
    }

    function handlerClickDate(event){//HANDLES THE CLICK OF ONE OF THE CLICKED DATES BUTTONS 

      //console.log("THE DATE BUTON THAT WAS CLICKED IS: "+event.target.value);//[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]
      setShow_Buttons(true);
      setChosenDate(event.target.value);

    }

    function cancel_Operation_Voting(){//THIS FUNCTION CANCELS THE VOTING ACTION OF THE PRESSED BUTTON DATE BEFORE

      setShow_Buttons(false);
      setChosenDate("");

    }

    ///////////////////////////////////// CONTRACT INTERACTION ///////////////////////////////////////////////////////
    

    async function voting_Confirmed(){//This contract makes the confirmation contract, that means that her the voting is issued at the Blockchain 

      if(window.ethereum !== "undefined"){
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();    
        const contract = new Contract(addrCourse, interface_Contract.abi, signer);
        try {

          await contract.issuing_Vote(chosenDate).then(() => {
            console.log("Te studnet has made his vote now");
          }).catch((error) => {
            const dataExcp = Object.values(error);
            console.log(dataExcp[7].error.data.message);
          });
          setStudent_Voted(true);

        } catch (error) {
          const dataExcp = Object.values(error);
          console.log(dataExcp[7].error.data.message);
        }
      }
    }
    
    async function student_Voted_To(){//Indicates what is the date that the student has voted

      if(window.ethereum !== "undefined"){
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();    
        const contract = new Contract(addrCourse, interface_Contract.abi, signer);

        await contract.getExamDay().then((voted) => {
          console.log("THE STUDENT VOTED TO...: "+voted);
          setVotedDate(voted);
          
        }).catch((error) => {
          const dataExcp = Object.values(error);
          console.log(dataExcp[7].error.data.message);
        })
      }

    }
    
    const check_Expiration_Contract = async () => {//THIS FUNCTION CHECKS IF THE CONTRACT OF THE CURRENT COURSE HAS EXPIRED.
      //RETURNS TRUE IF THE CONTRACT HAS EXPIRED AND SAVES THE DATE IN A USESTATE.

      if(window.ethereum !== "undefined"){
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();    
        const contract = new Contract(addrCourse, interface_Contract.abi, signer);

        try {

          // const hasExpired = await contract.timeForVotingIsOver();
          // console.log("THE CONTRAC EXPIRED? ",hasExpired);//[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]
          // if(hasExpired){
          //   setCloseVotation(true);
          //   console.log("the contract has expired now!");//[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]
          // }

          const timeContract = await contract.contract_Date_Expiration();
          setTimeContract(timeContract);

          if(timeContract){

            //const dateNowMil = Date.now() ;
            //const dateNow = new Date(dateNowMil)
            // const tempDate = new Date(timeContract);
            // console.log("THE CONTRACT TIME TEMPS IS:  ", tempDate);
            
            
            const dateNow = new Date();
            const newNumber = toNumber(timeContract);
            const parserToDate = new Date(newNumber * 1000);//
            console.log("THE PARSED TIME: ", parserToDate)
            let newExpDate = parserToDate.toString().substring(0,25);
            setExpiration(newExpDate);
            //console.log("THE TIME EXPIRATION CONTRACT USEEFFECT: ", typeof(newNumber));
            //console.log("THE TIME NOW IS: ", typeof(date));

            //console.log("THE DATE PARSED IS: ", parserToDate);
            //console.log("THE DATE NOW IS: ", dateNow);
            
            //console.log("THE DATE PARSED IN MILLISECONDS: ", newNumber * 1000);
            //console.log("THE DATE NOW IS: ", dateNow);
            //console.log("THE DATE NOW IN MILLISECONDS IS: ", dateNowMil);
            if(dateNow > parserToDate){
              //console.log("THE TIME IS OVER!!!");
              setCloseVotation(true);
              //THE DATE PARSED IS:  Wed Apr 26 2023 18:24:18 GMT+0300 (Israel Daylight Time) //MECANICA
              //THE DATE PARSED IS:  Wed Apr 26 2023 16:26:10 GMT+0300 (Israel Daylight Time) //FISICA
            }
    
          }
        } 
        catch (error) {
          const dataExcp = Object.values(error);
          console.log(dataExcp[7].error.data.message);
        }
      }
    }

   async function check_Student_Exist(){//THIS FUNCTION CHECKS IF THE STUDENT HAS EXIST AT THE BLOCKCHAIN ALREADY. IN THE CASE THAT HE DOESN'T EXIST, THE FUNCTION CREATES THE STUDENT.

      if(window.ethereum !== "undefined"){

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();    
        const contract = new Contract(addrCourse, interface_Contract.abi, signer);

        try {

          //IN THIS PART WE WILL SEE IF THE CURRENT USER EXISTS IN THE COURSE CONTRACT. const studentCreated = 
          await contract.studentAlreadyCreated(signer.address).then((created) => {
            if(!created){//CHECKS IF THE CURRENT STUDENT WAS ALREADY CREATED, IF NOT CREATES
              console.log("THE STUDENT WAS ALREADY CREATED BEFORE?: ",created);//[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]
              creating_Student();
            }
            else{
              setStudentCreated(true);
              check_Student_Voted();
              console.log("It was no necessary create the student because he/she exist already! ");//[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]
            }
          }); 
      
        } catch (error) {
          const dataExcp = Object.values(error);
          console.log(dataExcp[7].error.data.message);
        }

      }
        
    }

    async function check_Student_Voted(){//AFTER THAT WE CHECK IF THE STUDENT EXIST (IN THE FUNCTION ABOVE), IN THIS FUNCTION WE CHECK IN THE CASE THAT THE STUDENT EXIST, IF HAS VOTED OR NOT.
      //RETURNS TRUE IF THE STUDENT HAS NOT VOTE, OTHERWISE TRUE.

      if(window.ethereum !== "undefined"){

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();    
        const contract = new Contract(addrCourse, interface_Contract.abi, signer);

        try {

          await contract.getHasVoted().then((answ) => {
            setStudent_Voted(answ);
            console.log("THE STUDENT HAS ISSUED A VOTE?: ", answ);//{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}

          });
          

        } catch (error) {
          const dataExcp = Object.values(error);
          console.log(dataExcp[7].error.data.message);
        }

      }
    }

    async function creating_Student(){//WHEN THE STUDENT ENTERS FOR THE FIRST TIME TO THE COURSE THAT HE WANT TO VOTE,
      //HE NEEDS TO ACCEPT THE SUSCRIPTION TO THE BLOCKCHAIN BY HIS WALLET METAMASK, OTHERWISE HE CANNOT VOTE.

      if(window.ethereum !== "undefined"){

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();    
        const contract = new Contract(addrCourse, interface_Contract.abi, signer);
        
        await contract.create_Student().then((student) => {//CREATING THE STUDENT IN THE SYSTEM BLOCKCHAIN
          
          console.log("THE STUDENT HAS BEEN CREATED AT THE BLOCKCHAIN SUCCESSFULY! ",student);
          setStudentCreated(true);
        
        })
        .catch((error) => {
          console.log("The student exist already!, or the address User is of the Admin.");
          console.log("Please check if you change the user address to one STUDENT address !\n\n")
          const dataExcp = Object.values(error);
          console.log(dataExcp[7].error.data.message);
          
        });
        
      }
    }

    async function voting_Results(){//THIS FUNCTION SHOW US WICH ONE IS THE WINNER DATE THAT STUDENTS VOTED AND HOW MANY
      //STUDENTS VOTED TO THIS DATE. THE FUNCTION SAVES THIS INFO IN TWO GLOBAL VARIABLES

      if(window.ethereum !== "undefined"){

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();    
        const contract = new Contract(addrCourse, interface_Contract.abi, signer);
      
        try {
          let results = await contract.get_Date_Winner();
          setDateWinner(results[0]);
          //let parseNum = toNumber(results[1]);
          //setNumVotersWin(parseNum);

        } catch (error) {
          const dataExcp = Object.values(error);
          console.log(dataExcp[7].error.data.message);
        }
       
      }
    }

    ////////////////////////////////////// CONNECTING TO THE CONTRACT //////////////////////////////////////////////


    const connect_with_Contract = async() => {//this function create us the instance of our contract accordding to the address contract
      //given by the parameter in the path saved in the variable "addrCourse". Furthermore, this function give us the available dates for voting 
      //and create us the user STUDENT that wants to vote.

      if(window.ethereum !== "undefined"){
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();    
        const contract = new Contract(addrCourse, interface_Contract.abi, signer);

        try {

          //IN THIS PART WE WILL CONNECT TO THE BC AND EXTRACT THE AVAILABLE DATES OF THIS COURSE CREATED BY THE ADMIN 
          await contract.showAvailableDates().then((availableDates) => {
            //console.log("THE DATES ARE!!!: ",availableDates);//[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]
            let objDates = Object.values(availableDates);
            //console.log("the array dates is222222:", objDates);//[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]
            setDatesFromBC(objDates);
          }).catch(() => {
            console.log("The dates are not available yet.");
          });

        } catch (error) {
          const dataExcp = Object.values(error);
          console.log(dataExcp[7].error.data.message);
        }
        
      }
    }

    

    ////////////////////////////////////////////// uesEffects //////////////////////////////////////////
    
    useEffect(() => {

      if(runOnce.current === false){
        
        check_Expiration_Contract();
        check_Student_Exist();

        if(!closeVotation && !student_Voted){
          connect_with_Contract();//GIVE US THE CONTRACT DATES AND CREATE US THE CURRENT STUDENT AT THE COURSE CONTRACT BC.
          //IF THE STUDENT ALREADY EXIST, WE GET IF HE ALREADY VOTED 
          
        }
        if(!closeVotation && student_Voted){
          
          student_Voted_To();

        }
        if(closeVotation){

          voting_Results();

        }
      }

      return () => {
        //check_Expiration_Contract();
        runOnce.current = true;
      }

    },[closeVotation]);

    useEffect(() => {

      check_Expiration_Contract();
      student_Voted_To();

      if(closeVotation){
        voting_Results()
        //console.log("THE RESULTS ARE: ", dateWinner, numVotersWin);//[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]

      }
      
    },[timeContract, student_Voted]);


  return (

    <>
      
      {closeVotation ?

        <>
          <Title textTitle="The voting has finished" classType="issuing-vote" />
          <br />
          <Title textTitle={"The new Exam date is: "+ dateWinner} classType="voting-closed"/>
          <br/>
        </>

        :

        <>
        
          { (!student_Voted && studentCreated)  &&

            <>
              <Title textTitle={"The votation expires in: "+expiration} classType="expiration-Contract" />
              <div className='container-voting'>
                <Title textTitle="Issuing a vote" classType="issuing-vote" />
                <br/>
                <Title textTitle={"Course selected: "+nameCourse+'\n'+"  Id Course: "+idCourse+'\n\n  The available dates to chose are:'} classType="dataCourse-issuing-vote" />
                <br/>
              </div>
              {
                datesFromBC && datesFromBC.map((date, idx) => {
                  return(
                    <div className='dates' key={idx}>
                      <Button idButton={"date"+idx} name={"button"+idx} text={date} theValue={date} handlerFunction={handlerClickDate} classButton="student-buttonsDates" />
                    </div>
                  )
                })
              }
              <br/>
              <div className='container-voting'>
                <Title textTitle={"(Please press on the date of your choice)"} classType="choice-issuing-vote" />
              </div>
            
              {show_Buttons && 
                <>
                  <hr />
                  <Title textTitle={"Are you sure you to vote for the date: "+chosenDate+" ?"} classType="confirmation-voting" />
                  <br/>
                  <div className='container-ButtonConfirm'>
                    <Button idButton="cancel" name="cancel" text="CANCEL" classButton="cancel-vote" handlerFunction={cancel_Operation_Voting} />
                    <Button idButton="confirm" name="confirm" text="CONFIRM" classButton="confirm-vote" handlerFunction={voting_Confirmed} />
                  </div>
                  <br/>
                  <Title textTitle="IMPORTANT NOTE: ONCE YOU PUSH ON THE BUTTON 'CONFIRM', YOU WILL NOT BE ABLE TO VOTE AGAIN TO THIS COURSE!" classType="important-note" />
                </>
              }
            </>
  
          }

          {(!student_Voted && !studentCreated) && 

            <div className='container-voting'>
              <Title textTitle="Please press on the button confirm to create the profile in the Blockchain, otherwise press on cancel." classType="confirmation-voting" />
            </div>
          }

          {(student_Voted) &&
          
            <div className='container-voting'>
              <Title textTitle={"You has voting to the date: "+votedDate} classType="confirmation-voting" />
              <br/>
              <br/>
              <Title textTitle={"Please wait to the final voting to watch the final results."} classType="confirmation-voting" />

            </div>
          
          }
        
        </>
      }
      <br/>
      <br/>
      <div className='button-home'>

        <br/>
        <br/>
        <Button idButton="home" text="HOME" classButton="button-regular" handlerFunction={handlerClickHome}  />

      </div>

      

    </>
  )
}


// const get_Exam_Day = await contract.getExamDay();
// console.log("THE EXAM DAY GOTTEN IS: ",get_Exam_Day);






// const create_Student_at_BC = async () => {

//   const provider = new ethers.BrowserProvider(window.ethereum);
//   const signer = await provider.getSigner();    
//   setAddressStudent(signer.address);
//   const contract = new Contract(addrCourse, interface_Contract.abi, signer);

//   if(window.ethereum !== "undefined"){

//     try {
      
//       //CHECKING IF THE STUDENT EXISTS IN THE CONTRACT
//       const studentCreated = await contract.studentAlreadyCreated(signer.address); 
//       console.log("THE STUDENT WAS ALREADY CREATED BEFORE?: ",studentCreated);//[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]

//       if(studentCreated == false){//CHECKS IF THE CURRENT STUDENT WAS ALREADY CREATED, IF NOT CREATES
//         //THE STUDENT, OTHERWISE, CONTINUES MAKING THE OPERATIONS

//         await contract.create_Student().then((student) => {//CREATING THE STUDENT IN THE SYSTEM BLOCKCHAIN
//           console.log("THE STUDENT HAS BEEN CREATED AT THE BLOCKCHAIN SUCCESSFULY! ",student);

//         })
//         .catch((failed) => {
//           console.log("The student exist already!, or the User is the Admin.");
//           console.log("Please check if you change the user address to one STUDENT address !\n\n")
//           const dataExcp = Object.values(failed);
//           console.log(dataExcp[7].error.data.message);
//         });
//       }
//       else{
//         console.log("It was no necessary create the student because exist already! ");//[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]
//         const studentHasVoted = await contract.getHasVoted();
//         //console.log("THE STUDENT HAS ISSUED A VOTE? line72: ", studentHasVoted);//{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}
//         setStudent_Voted(studentHasVoted);
//       }
//     }
//     catch (error) {
//       const dataExcp = Object.values(error);
//       console.log(dataExcp[7].error.data.message);
//     }
//   }
// }






