import React, { useState } from 'react';
import './Modal.css';
import { ethers, Contract, toNumber } from "ethers";
import interface_Contract from './../../artifacts/contracts/createVote.sol/createVote.json'
import { useEffect } from 'react';
import { Title } from '../Title/Title';
import { Label } from '../Label/Label';
import { object } from 'prop-types';
import { LoadingPage } from '../LoadingPage/LoadingPage';

//import votingPhoto from '../../assets/images/Picture1.png'


export const Modal = ({opened, closeModal, addr, nameCourse, idCourse}) => {

  const [expiration, setExpiration] = useState(null);
  const [closeVotation, setCloseVotation] = useState(null);
  const [votes, setVotes] = useState([]);
  const [dateWinner, setDateWinner] = useState('');
  const [timeContract, setTimeContract] = useState(0);//save the time expiration contract in millisecs  
  const [addrCourse, setAddrCourse] = useState(addr);
  const [loading, setLoading] = useState(null);




  function handlerClose(){
      closeModal(false);
  }

  async function get_Data(){

    if(window.ethereum !== "undefined"){
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();  
      const contract = new Contract(addrCourse, interface_Contract.abi, signer);

      try {
        
        const dataVotes = await contract.get_Votes();
        //console.log("DATA...", data[0])//[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]
        let idx = 1;
        let obj = [];
        dataVotes[0].map((result) => {
          //console.log(result);[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
          obj.push( {[result]: toNumber(dataVotes[idx])});  
          
          idx++;
        })//setVotes(... {[result]: dataVotes[idx]});
        //obj = new Object(obj);
        setVotes(obj)
        //console.log("THE, ",votes);//[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]

  
      } catch (error) {
        const dataExcp = Object.values(error);
        console.log(dataExcp[7].error.data.message);
      }
      
    }
  }

  const check_Expiration_Contract = async () => {//THIS FUNCTION CHECKS IF THE CONTRACT OF THE CURRENT COURSE HAS EXPIRED.
    //RETURNS TRUE IF THE CONTRACT HAS EXPIRED AND SAVES THE DATE IN A USESTATE.
    charging_Page();
    if(window.ethereum !== "undefined"){
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();    
      const contract = new Contract(addrCourse, interface_Contract.abi, signer);

      try {

        const timeContract = await contract.contract_Date_Expiration();
        setTimeContract(timeContract);

        if(timeContract){

          const dateNow = new Date();
          const newNumber = toNumber(timeContract);
          const parserToDate = new Date(newNumber * 1000);
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

  async function voting_Results(){//THIS FUNCTION SHOW US WICH ONE IS THE WINNER DATE THAT STUDENTS VOTED AND HOW MANY
    //STUDENTS VOTED TO THIS DATE. THE FUNCTION SAVES THIS INFO IN TWO GLOBAL VARIABLES

    if(window.ethereum !== "undefined"){

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();    
      const contract = new Contract(addrCourse, interface_Contract.abi, signer);
    
      try {
        let results = await contract.get_Date_Winner();
        setDateWinner(results[0]);

      } catch (error) {
        const dataExcp = Object.values(error);
        console.log(dataExcp[7].error.data.message);
      }
     
    }
  }

  ////////////////////////////////////////////// SOS FUNCTIONS //////////////////////////////////////////

  const charging_Page = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    },2000);
  }
  

////////////////////////////////////////////// uesEffects //////////////////////////////////////////
  

  useEffect(() => {

      check_Expiration_Contract();
      if(!closeVotation){
        get_Data();
      }
      else{
        voting_Results();
      }
  
  },[closeVotation, timeContract, addrCourse]);

  return (
    <article className={`modal ${opened && 'is-open'}`}>
        
        <div className='modal-container'>

            <button className='modal-close' onClick={handlerClose}>X</button>
            <br />
            {loading ? 
            
              <LoadingPage/>
              :
              <>
                {!closeVotation ?
                  <>
                    {votes && 
                      <>
                        <Title textTitle="Voting in process..." classType='admin-modal' />
                        <br />
                        <Title textTitle={"The votation expires in: "+expiration} classType="expiration-Contract" />
                        <br />
                        <Title textTitle={'Course: '+nameCourse} classType="modal-Course" />
                        <Title textTitle={'Id: '+idCourse} classType="modal-Course" />
                        <h2>The results till now are:</h2>
                        {votes.map((result) => {
                          let tempDate = Object.keys(result);
                          let tempNum = Object.values(result);
                          console.log("THE VALUS ARE: ",tempDate[0]);//[[[[[[[[[[[[[[]]]]]]]]]]]]]]
                          return(
                            <div className='container-Dates'>
                              <span id="container-Results">{"Date: "+tempDate[0]+"   ->   Voters: "+tempNum}</span>
                              <br />
                              <br />
                          
                            </div>
                          )
                          
                        })}

                      </>
                    }
                  </>
                  :
                  <>
                    <Title textTitle="The voting finished" classType='admin-modal' />
                    <br />
                    <Title textTitle={'Course: '+nameCourse} classType='data-course-Modal' />
                    <Title textTitle={'Id: '+idCourse} classType='data-course-Modal' />
                    <br />
                    <Title textTitle={"The new Exam date is: "+ dateWinner} classType="voting-closed-Modal"/>
                    <br/>
                  </>
                }
              </>
            }

            
            
        </div>

    </article>
  )
}
