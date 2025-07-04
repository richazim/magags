import { getLoggedInUser } from '@/libs/appwrite/account/getLoggedInUser';
import React, { createContext, useEffect, useState } from 'react';
import { Models } from 'react-native-appwrite';

type AuthContextType = {
    loggedInUser: Models.Document | null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<Models.Document | null>>;
    appwriteLoading: boolean;
    error: any;
    refetch: () => void;
};
  

const AuthContext = createContext<AuthContextType>({
  loggedInUser: null,
  setLoggedInUser: () => {},
  appwriteLoading: true,
  error: null,
  refetch: () => {}
});
export default AuthContext;

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const [loggedInUser, setLoggedInUser] = useState<Models.Document | null>(null);
  const [appwriteLoading, setAppwriteLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    getLoggedInUser()
      .then((user) => setLoggedInUser(user))
      .catch((err) => setError(err))
      .finally(() => setAppwriteLoading(false));
  }, []);

  const refetch = async () => {
    setAppwriteLoading(true);

    getLoggedInUser()
      .then((user) => setLoggedInUser(user))
      .catch((err) => setError(err))
      .finally(() => setAppwriteLoading(false))
  }
 
  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, appwriteLoading, error, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};
