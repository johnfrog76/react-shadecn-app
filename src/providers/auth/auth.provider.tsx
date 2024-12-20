import React, { FC, createContext, useState, useEffect } from "react";

import {
  setUserAuth,
  getUserAuth,
  expireAuth,
  getRemainingTime,
  iUser,
} from "./auth.utilities";

type UserContextType = {
  user: iUser | null;
  isLoggedIn: boolean;
  token: string | null;
  setLogin: (val: boolean) => void;
  setUserToken: (val: string | null) => void;
  setUserObject: (val: iUser | null) => void;
  setUserExpiration: (val: number | null) => void;
  expiration: number | null;
  setUserAuth: (user: iUser, expires: number) => void;
  getUserAuth: () => void;
  expireAuth: () => void;
  getRemainingTime: () => number;
};

export const AuthContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  token: null,
  setLogin: () => {},
  setUserToken: () => {},
  setUserObject: () => {},
  expiration: null,
  setUserExpiration: () => {},
  setUserAuth: () => {},
  getUserAuth: () => {},
  expireAuth: () => {},
  getRemainingTime: () => 0,
});

interface Props {
  children?: React.ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<iUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [expiration, setExpiration] = useState<number | null>(null);
  const setLogin = (val = false) => setIsLoggedIn(val);
  const setUserToken = (val: string | null) => setToken(val);
  const setUserObject = (val: iUser | null) => setUser(val);
  const setUserExpiration = (val: number | null) => setExpiration(val);

  useEffect(() => {
    expireAuth();
    const storageUser = getUserAuth();

    if (storageUser) {
      setUser(storageUser.user);
      setIsLoggedIn(true);
      setToken(storageUser.user.token);
      setExpiration(storageUser.expires);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        token,
        expiration,
        setLogin,
        setUserToken,
        setUserObject,
        setUserExpiration,
        setUserAuth,
        getUserAuth,
        expireAuth,
        getRemainingTime,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
