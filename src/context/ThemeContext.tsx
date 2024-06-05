"use client";

import { darkTheme, lightTheme } from "@/styles/theme";
import { ITheme } from "@/types/theme";
import { FC, createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

type TThemeProvider = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<any | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("Error");
  }
  return context;
};

export const ThemeProvider: FC<TThemeProvider> = ({ children }) => {
  const [theme, setTheme] = useState<ITheme>(lightTheme);

  useEffect(() => {
    // TODO: Change to Firebase
    const saveInLocal = localStorage.getItem("theme");
    const savedTheme = saveInLocal ? JSON.parse(saveInLocal) : lightTheme;
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme.namespace === lightTheme.namespace ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
