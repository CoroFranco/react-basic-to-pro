import { createContext, useState } from "react";

export const FiltersContext = createContext()

export function FiltersProvider ({children}) {
  const [filters, setFilters] = useState({
    price: 0,
    category: `ALL`,
    title: ``
  })

  return (
    <FiltersContext.Provider value={{filters, setFilters}}>
      {children}
    </FiltersContext.Provider>
  )
}
