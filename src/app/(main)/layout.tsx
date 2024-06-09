'use client'

import { ReactNode, useContext, useEffect } from 'react'
import { useMedia } from 'react-use'
import { Header } from '../components/Header'
import { Bar } from '../components/Bar'
import { UserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation'

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const router = useRouter()
  const isMobile = useMedia('(max-width: 600px)')
  const [userState] = useContext<any>(UserContext)

  useEffect(() => {
    if (!userState.isLogged && !userState.isPending) {
      router.push('/')
    }
  }, [userState.isLogged, userState.isPending, router])

  if (!userState.isLogged && !userState.isPending) {
    return null
  }

  return (
    <>
      {userState.isLogged && (
        <>
          {!isMobile && <Header />}
          {children}
          {isMobile && <Bar />}
        </>
      )}
    </>
  )
}
