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
    <main 
      className={`${darkMode ? "dark" : ""} min-h-screen transition-colors duration-300 ease-in-out
        dark:bg-neutral-900 dark:text-gray-100 
        bg-gray-50 text-gray-900`}
    >
      <NavBar />

      {/* Main content with responsive width */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>

      {/* Theme Toggle - improved positioning */}
      <div className="fixed top-20 right-6 md:right-10 z-50 transition-all duration-300 ease-in-out 
                     hover:scale-105 shadow-lg rounded-full p-2 
                     dark:bg-neutral-800 dark:hover:bg-neutral-700
                     bg-white hover:bg-gray-100">
        <button 
          onClick={toggleTheme} 
          className="focus:outline-none"
          aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          <CustomThemeToggle isDarkMode={!darkMode} />
        </button>
      </div>
    </main>
  )
}
