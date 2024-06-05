"use client";

import { useReducer, createContext, useEffect, useContext } from "react";

import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../config/firebase";

const initialState = {
  isLogged: false,
};

export const UserContext = createContext({});

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("Error");
  }
  return context;
};

const userReducer = (
  state: object,
  { type, payload }: { type: string; payload: object }
) => {
  switch (type) {
    case "SET_USER_LOGGED":
      return {
        ...state,
        ...payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return initialState;
  }
};

export const UserProvider = ({ children }: any) => {
  const [state, UserDispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    setAuthPersistence();
    verifyUserLogged();
  }, []);

  const setAuthPersistence = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.info("App configured to save session");
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const verifyUserLogged = () => {
    auth.onAuthStateChanged((user) => {
      UserDispatch({
        type: "SET_USER_LOGGED",
        payload: { isLogged: user !== null, ...user },
      });
    });
  };

  return (
    <UserContext.Provider value={[state, UserDispatch]}>
      {children}
    </UserContext.Provider>
  );
};
