"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import { Login } from "./components/Login";

export default function Home() {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <main>
      <p>Hola</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Login />
    </main>
  );
}
