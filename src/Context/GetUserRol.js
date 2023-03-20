import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseApp from '../firebase/credentials';

const GetUserRol = createContext();

const auth = getAuth(firebaseApp); //contains an instance of the authentication firebase service
const firestore = getFirestore(firebaseApp); //contains the instance to the firestore service of our aplication firebase


const UserRolProvider = ({ children }) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////
  const [userAuth, setUserAuth] = useState(null); //saves if an user is logedin
  const [userRol, setUserRol] = useState("");

 
  onAuthStateChanged(auth, (userInFirebase) => {
    if (userInFirebase) {
      setUserAuth(userInFirebase);
    } else {
      setUserAuth(null);
      setUserRol(" ");
    }
  });
  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

  async function readUserDataFromDB(uidUser) {
    //this function will read the user data fro the data base firestore

    const refDoc = doc(firestore, `/Users/${uidUser}`); //we are obtaining the reference of the document according the specific user in firestore service
    const userDocEncrypted = await getDoc(refDoc); //we obtained the specific document of the user requiring the document but in a encrypted mode
    const userUncryptedData = userDocEncrypted.data();
    const dataUserReturn = {
      rol: userUncryptedData.rol,
    };
    //console.log("THE DATA UNCRYPTED IN THE CONTEXT FILE IS: " + dataUserReturn); ////////////////////////////////////
    return dataUserReturn;
  }

  function readDataUserFromDB(uidUSER) {

    readUserDataFromDB(uidUSER)
      .then((dataUserReturn) => {
        setUserRol(dataUserReturn.rol);
        //console.log("THE DATA SAVED IN THE DB IS " + userAutenticated.secName);///////////////////////////////////////////////////////////
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (userAuth?.uid) {
        readDataUserFromDB(userAuth.uid);
        console.log("THE USER ROL FROM THE CONTEXT USER ROL FILE IS: "+ userRol);

    }
    else{
        console.log("The user are DISCONNECTED from the DB IN THE CONTEXT USER ROL FILE");
    }
  }, [userAuth]);

  //]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  
  const dataUser = {userRol};
  
  return <GetUserRol.Provider value={dataUser}>{children}</GetUserRol.Provider>;
};

export { UserRolProvider };
export default GetUserRol;









//ESTRUCTURA BASICA DEL CONTEXTO

// import { createContext } from "react";

// const UserFromDB = createContext();

// const DBProvider = ({children}) => {
//     const data = {}
//     return(
//         <UserFromDB.Provider value={data}>{children}</UserFromDB.Provider>
//     )
// };

// export {DBProvider};
