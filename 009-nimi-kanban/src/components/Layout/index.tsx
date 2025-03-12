"use client"

import type { ReactNode } from "react"
import NavBar from "../NavBar"
import CustomThemeToggle from "../ThemeToggle"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setDarkMode(resolvedTheme === "dark")
  }, [resolvedTheme])

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    setTheme(newDarkMode ? "dark" : "light")
  }

  return (
    <main className={`${darkMode ? "dark" : ""} relative dark:bg-neutral-900 bg-gray-200 flex flex-col`}>
      <NavBar />

      {/* Contenido principal con altura ajustada */}
      <div className="w-[1800px] mx-auto px-4 py-8 ">
        {children}
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-1/6 right-10 transform -translate-y-1/2 z-50">
        <button onClick={toggleTheme} aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}>
          <CustomThemeToggle isDarkMode={!darkMode} />
        </button>
      </div>
    </main>
  )
}


