import { useEffect, useState } from "react"

export default function useDark () {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode")
      if (saved !== null) {
        return JSON.parse(saved)
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    return false
  })



const handleDarkMode = () => {
  const newTheme = dark === 'dark' ? 'light' : 'dark'
  setDark(!dark)
  localStorage.setItem("theme", newTheme);
  document.documentElement.setAttribute("data-theme", newTheme);
}

useEffect(() => {
  document.documentElement.classList.toggle("dark", dark)
  localStorage.setItem("darkMode", JSON.stringify(dark))
}, [dark])

return{dark, handleDarkMode}
}
