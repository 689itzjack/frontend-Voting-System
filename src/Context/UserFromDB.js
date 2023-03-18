import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseApp from '../firebase/credentials';

const UserFromDB = createContext();

const auth = getAuth(firebaseApp); //contains an instance of the authentication firebase service
const firestore = getFirestore(firebaseApp); //contains the instance to the firestore service of our aplication firebase


const DBProvider = ({ children }) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////
  const [userAuth, setUserAuth] = useState(null); //saves if an user is logedin
  const [userFromDB, setUserFromDB] = useState(null);

 
  onAuthStateChanged(auth, (userInFirebase) => {
    if (userInFirebase) {
      setUserAuth(userInFirebase);
    } else {
      setUserAuth(null);
      //console.log(userAuth); ///////////////////////////////////////////////
    }
  });
  //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

  async function readUserDataFromDB(uidUser) {
    //this function will read the user data fro the data base firestore

    const refDoc = doc(firestore, `/Users/${uidUser}`); //we are obtaining the reference of the document according the specific user in firestore service
    const userDocEncrypted = await getDoc(refDoc); //we obtained the specific document of the user requiring the document but in a encrypted mode
    const userUncryptedData = userDocEncrypted.data();
    const dataUserReturn = {
      name: userUncryptedData.name,
      secName: userUncryptedData.secName,
      email: userUncryptedData.email,
      phone: userUncryptedData.phone,
      adMeta: userUncryptedData.adMeta,
      pass: userUncryptedData.pass,
      rol: userUncryptedData.rol,
    };
    console.log("THE DATA UNCRYPTED IS: " + dataUserReturn); ////////////////////////////////////
    return dataUserReturn;
  }

  function readDataUserFromDB(uidUSER) {
    readUserDataFromDB(uidUSER)
      .then((dataUserReturn) => {
        const { name, secName, email, phone, adMeta, pass, rol } =
          dataUserReturn;
        const userAutenticated = {
          uidUser: uidUSER,
          name: name,
          secName: secName,
          email: email,
          phone: phone,
          adMeta: adMeta,
          pass: pass,
          rol: rol,
        };
        setUserFromDB(userAutenticated);

        //console.log("THE DATA SAVED IN THE DB IS " + userAutenticated.secName);///////////////////////////////////////////////////////////
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (userAuth?.uid) {
        console.log("THE UID IS : "+ userAuth.uid);
        readDataUserFromDB(userAuth.uid);
    }
    else{
        console.log("The user are DISCONNECTED from the DB");
    }
  }, [userAuth]);

  //]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  
  const dataUser = {userFromDB};
  
  return <UserFromDB.Provider value={dataUser}>{children}</UserFromDB.Provider>;
};

export { DBProvider };
export default UserFromDB;









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
