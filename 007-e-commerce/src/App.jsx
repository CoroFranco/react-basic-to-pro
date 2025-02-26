import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import useDark from './hooks/useDark'
import {  AnimatePresence } from 'framer-motion'
import Cart from './components/Cart'
import Products from './components/Products'
import { FiltersProvider } from './contexts/filter'

function App() {
  const { dark, handleDarkMode } = useDark()
  const [isCartAside, setIsCartAside] = useState(false)

  const handleCart = () => {
    setIsCartAside(!isCartAside)
  }

  const handleOutsideClick = (e) => {
    if (e.target.id === 'overlay') {
      setIsCartAside(false)
    }
  }

  return (
    <div className={`min-h-[2000px] absolute w-full ${dark ? "bg-gray-700 text-white" : "bg-white text-black"}`}>
    <FiltersProvider >
      <Header dark={dark} handleDarkMode={handleDarkMode} handleCart={handleCart}/>
      <AnimatePresence>
        {isCartAside && (
          <Cart closeCart={handleOutsideClick}/>
        )}
      </AnimatePresence>
        <Products  dark={dark}/>     
    </FiltersProvider>
    </div>
  )
}

export default App
