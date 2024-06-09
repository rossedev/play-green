'use client'

import {
  useReducer,
  createContext,
  useEffect,
  ReactNode,
  useTransition,
  useCallback,
} from 'react'

import { setPersistence, browserLocalPersistence } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { toast } from 'react-toastify'

const initialState = {
  isLogged: false,
  isPending: true,
}

export const UserContext = createContext({})

const userReducer = (
  state: object,
  { type, payload }: { type: string; payload: object },
) => {
  switch (type) {
    case 'SET_USER_LOGGED':
      return {
        ...state,
        ...payload,
      }
    case 'LOGOUT':
      return initialState
    default:
      return initialState
  }
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, UserDispatch] = useReducer(userReducer, initialState)
  const [isPending, startTransition] = useTransition()

  const verifyUserLogged = useCallback(() => {
    auth.onAuthStateChanged((user) => {
      UserDispatch({
        type: 'SET_USER_LOGGED',
        payload: { isLogged: user !== null, isPending, ...user },
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    startTransition(() => {
      setAuthPersistence()
      verifyUserLogged()
    })
  }, [verifyUserLogged])

  const setAuthPersistence = () => {
    setPersistence(auth, browserLocalPersistence).catch(() => {
      toast.error('Persistance Problems', {
        autoClose: 2000,
      })
    })
  }

  return (
    <UserContext.Provider value={[state, UserDispatch]}>
      {children}
    </UserContext.Provider>
  )
}
