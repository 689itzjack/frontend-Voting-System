import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Lista } from '../../commons/lista/Lista'
import { Title } from '../../commons/Title/Title'
import UserFromDB from '../../Context/UserFromDB'
import { COURSE } from '../../paths/pathsRoutes'
import { Course } from '../Course/Course'
import { Listcourses } from './components/ListCourses/Listcourses'
import './HomeStudent.css'
import { IssueVote } from './subpages/IssueVote/IssueVote'
import { ethers, Contract, toNumber } from "ethers";
import { async } from '@firebase/util'




export const HomeStudent = ({ dataUser }) => {

//    console.log()

    const {userFromDB} = useContext(UserFromDB);
    //const {pathname} = useLocation();
    const navigate = useNavigate();


    const [shownList, setShownList] = useState(true);
    const [clickedButton,setClickedButton] = useState(false);
    const [dataButtonClicked, setDataButtonClicked] = useState({});
    const [pressBackButton, setPressBackButton] = useState(false);

    async function checking_Address_Metamask(){

        if(window.ethereum !== "undefined"){
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();  
            if(userFromDB.adMeta !== signer.address){
                alert("Dear User, Please active your Metamask account.");
                setShownList(false);
            }
            else{
                setShownList(true);
            }
        }
    }

    useEffect(() => {
        checking_Address_Metamask();
    },[]);

    useEffect(() => {

        //console.log("The BUTTON WAS CLICKED: "+clickedButton);//[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]
        //console.log("The BUTTON BACK WAS CLICKED?: "+pressBackButton);//[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]


        
        // if(!shownList)
        //     setShownList(true);
        
        if(clickedButton){
            setShownList(false);
            setPressBackButton(false);
            //console.log("The data from the pushed button is: ",dataButtonClicked);//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
            navigate(`/home/course/${dataButtonClicked.nameCourse}/${dataButtonClicked.idCourse}/${dataButtonClicked.addrCourse}`, {
                replace: true,
                state:{
                    logedIn:true,
                }
            });
        }
        if(pressBackButton){
            setShownList(true);
            setPressBackButton(false);
            setClickedButton(false);
        }
      

    },[clickedButton, pressBackButton]);

  return (
    <div className='page-student'>
        
        <aside>
            <h1>Hi Dear Student !<br/><br/> Welcome to the voting system</h1>
            <div className='container-list'>
                <Lista adminData={userFromDB}/>
            </div>
        </aside>

        <main className='container-main'>
            {shownList && 

                <div className='container-courses'>
                    <br/>
                    <Title textTitle="Please select a course to issue a vote:" classType="title-selectCourse" />
                    <div className='list-courses'>
                        <br/>
                        <Listcourses buttonClickedFather={setClickedButton} dataButton={setDataButtonClicked} />
                    </div>
                </div>
            }

            {clickedButton && 

                <Routes>
                    <Route path={COURSE} element={<IssueVote backButton={setPressBackButton} />} ></Route>
                </Routes>
            }
    
            
        </main>
        
    </div>
  )
}
