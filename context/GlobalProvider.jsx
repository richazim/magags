import React, {createContext, useEffect, useState} from 'react';
import {getLoggedInUser} from "../lib/appwrite";

const GlobalContext = createContext(null);

export default GlobalContext;

export const GlobalProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [appwriteLoading, setAppwriteLoading] = useState(true);

    useEffect(() => {
        getLoggedInUser()
            .then((response) => {
                setLoggedInUser(response);
                setAppwriteLoading(false);
            })
            .catch((err) => {
                // console.log(err);
            })
            .finally(() => {
                setAppwriteLoading(false);
            })
    }, []);

 return (
  <GlobalContext.Provider value={{loggedInUser, setLoggedInUser, appwriteLoading}}>
      {children}
  </GlobalContext.Provider>
 );
};