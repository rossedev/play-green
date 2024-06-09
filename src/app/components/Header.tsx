import { ThemeContext } from '@/context/ThemeContext'
import { useUser } from '@/firebase/auth/user'
import {
  ContainerConfig,
  ContainerHeader,
  ContainerMenu,
} from '@/styles/Header.styled'
import { lightTheme } from '@/styles/theme.styled'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import { RxExit } from 'react-icons/rx'

export const Header = () => {
  const pathname = usePathname()
  const useTheme = useContext(ThemeContext)
  const { handleSignOut } = useUser()

  const samePath = (path: string) => {
    return pathname === path
  }

  return (
    <ContainerHeader>
      <p className="title">Playgreen</p>
      <ContainerMenu>
        <Link
          href="/dashboard"
          className={`${samePath('/dashboard') && 'current'}`}
        >
          Home
        </Link>
        <Link
          href="/history"
          className={`${samePath('/history') && 'current'}`}
        >
          History
        </Link>
        <Link href="/history">Profile</Link>
      </ContainerMenu>

      <ContainerConfig>
        <Image
          src={
            useTheme?.theme.namespace === lightTheme.namespace
              ? '/moon.svg'
              : '/sun.svg'
          }
          alt="Sun"
          width={24}
          height={24}
          onClick={useTheme?.toggleTheme}
        />
        <RxExit className="close" onClick={handleSignOut} />
      </ContainerConfig>
    </ContainerHeader>
  )
}
