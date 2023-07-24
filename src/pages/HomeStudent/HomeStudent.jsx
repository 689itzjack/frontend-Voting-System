import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Lista } from '../../commons/lista/Lista'
import { Title } from '../../commons/Title/Title'
import UserFromDB from '../../Context/UserFromDB'
import { COURSE, ERROR404COURSE, HOME, LOGIN } from '../../paths/pathsRoutes'
//import { Course } from '../Course/Course'
import { Listcourses } from './components/ListCourses/Listcourses'
import './HomeStudent.css'
import { IssueVote } from './subpages/IssueVote/IssueVote'
import { ethers } from "ethers";
import { ErrorLogedin } from '../../commons/pageError/ErrorLogedin'
import firebaseApp from './../../firebase/credentials'
import { collection, getDocs, getFirestore } from '@firebase/firestore'
import { Button } from '../../commons/Button/Button'
import { getAuth, signOut } from '@firebase/auth'
import { NavbarUser } from '../../commons/Navbar/NavbarUser/NavbarUser'


export const HomeStudent = () => {


    const {userFromDB} = useContext(UserFromDB);
    //const {pathname} = useLocation();
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);//contains an instance of the authentication firebase service


    const [shownList, setShownList] = useState(true);
    const [clickedButton,setClickedButton] = useState(false);
    const [dataButtonClicked, setDataButtonClicked] = useState({});
    const [pressBackButton, setPressBackButton] = useState(false);
    const [matchPath, setMatchPath] = useState(false);
    const [finishReading , setFinishReading ] = useState(false);


    const {pathname} = useLocation();

    //////////////////////////////////////// FUNCTIONS //////////////////////////////////////// 

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

   
    ///////////////////////////////////////////// FUNCTIONS METAMASK ///////////////////////////////////////////// 

    function matching_Path(){//THIS FUNCTION DETECTS EVERY TIME THAT THE PATH WAS CHANGED. IF SOMEBODY CHANGES THE PATH
        //THE FUNCTION CHECKS IF THE PATH IS CORRECT, OTHERWISE WE WILL RECIEVE AN ERROR MESSAGE. 

        const firestore = getFirestore(firebaseApp);//I am creating an instance of the firestore service app
        const courses_collection = collection(firestore, 'Courses');
        getDocs(courses_collection).then((res) => {
           
            res.docs.map((answ) => {

                let {adressCourse, idCourse} = answ.data();
                let creatingPath = `/course/${answ.id}/${idCourse}/${adressCourse}`;
                if(pathname.includes('%20')){
                    
                    var strnew = decodeURI(pathname);
                    if(strnew === creatingPath)
                        setMatchPath(true);
                }
                if(pathname === creatingPath){
                  //console.log("EXIST A MATCH");//[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]
                  setMatchPath(true);
                }
            })
            setFinishReading(true);
          });
    }

    

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {

        checking_Address_Metamask();
        
    },[]);

    useEffect(() => {
        
        if(!clickedButton && pathname !== '/*'){

            matching_Path();
            if(matchPath){
                setMatchPath(true);
                setShownList(false);
                setPressBackButton(false);
                setClickedButton(false);
                console.log("THE PATH IS: ", pathname)//[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]
                navigate(pathname, {
                    replace: true,
                    state:{
                        logedIn:true,
                    }
                });
            }
            if(!matchPath && finishReading){

                console.log("THE PATHS NOT AVAILABLE");
                setMatchPath(true);
                setShownList(false);
                setPressBackButton(false);
                setClickedButton(false);
                navigate(ERROR404COURSE, {
                    replace: true,
                    state:{
                        logedIn:true,
                    }
                });
            }
        }
        
    },[matchPath,finishReading]);


    useEffect(() => {
        
        if(clickedButton){
            setShownList(false);
            setPressBackButton(false);
            //console.log("The data from the pushed button is: ",dataButtonClicked);//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
            navigate(`/course/${dataButtonClicked.nameCourse}/${dataButtonClicked.idCourse}/${dataButtonClicked.addrCourse}`, {
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
            setMatchPath(false);
            
            navigate(HOME, {
                replace: true,
                state:{
                    logedIn:true,
                }
              });
        }

    },[clickedButton, pressBackButton]);

    
  return (
    <>

        <NavbarUser typeUser={"student"} clickedHome={setPressBackButton} userFromDB={userFromDB} />

        <div className='page-student'>

            <aside>
                <br />
                <span className='span-Up'>Hi Dear Student !</span> <br/><br/><span className='span-Down' >Welcome to the voting system</span><br />
                <div className='container-list-Student'>
                    <Lista adminData={userFromDB}/>
                </div>
            </aside>

            <main className='container-main'>
                {shownList && 

                    <div className='container-courses'>
                        <div className='list-courses'>
                            <br/>
                            <Title textTitle="Please select a course to issue a vote:" classType="title-selectCourse" />
                            <br/><br />
                            <Listcourses buttonClickedFather={setClickedButton} dataButton={setDataButtonClicked} />
                        </div>
                    </div>
                }

                {(clickedButton || matchPath) && 

                    <Routes>

                        <Route path={COURSE} element={<IssueVote backButton={setPressBackButton} />} />
                        <Route path={ERROR404COURSE} element={<ErrorLogedin message="Page not exist"/>} />

                    </Routes>
                }


            </main>
            
        </div>
    </>
  )
}
