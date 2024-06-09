'use client'

import { darkTheme, lightTheme } from '@/styles/theme.styled'
import { ITheme } from '@/types/theme'
import { FC, createContext, useEffect, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

type TThemeProvider = {
  children: React.ReactNode
}

interface ThemeContextProps {
  theme: ITheme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
)

export const ThemeProvider: FC<TThemeProvider> = ({ children }) => {
  const [theme, setTheme] = useState<ITheme>(lightTheme)

  useEffect(() => {
    const saveInLocal = localStorage.getItem('theme')
    const savedTheme = saveInLocal ? JSON.parse(saveInLocal) : lightTheme
    setTheme(savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme =
      theme.namespace === lightTheme.namespace ? darkTheme : lightTheme
    setTheme(newTheme)
    localStorage.setItem('theme', JSON.stringify(newTheme))
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
