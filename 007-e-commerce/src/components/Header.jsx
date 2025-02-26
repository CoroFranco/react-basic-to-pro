import useFilters from "../hooks/useFilters"

export default function Header ({dark, handleDarkMode, handleCart}) {
  const {filters, setFilters} = useFilters()

  const handleChange = (e) => {
    const newTitle = e.target.value
    setFilters(prevFilters => ({
      ...prevFilters, 
      title: newTitle
    }));
    console.log(newTitle)
  }
  
  return (
    <header className='flex justify-between w-full mx-auto py-[15px] px-[40px] sticky top-0 z-40 backdrop-blur-sm bg-black/10 bg-opacity '>
      <h1 className='text-2xl font-bold'>NimiStore</h1>
      <div className='relative flex  gap-5'>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground text-white "><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        <input value={filters.title} onChange={handleChange} className="dark:placeholder-white text-white flex h-10 w-full rounded-md  px-3 py-2 text-sm  pl-8 md:w-[300px] lg:w-[500px] bg-gray-800" placeholder="Search products..." type="search" />
        </div>
      <div className='flex gap-5'>
        <button onClick={handleDarkMode} className='cursor-pointer'>
          {dark ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun h-6 w-6 "><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon h-6 w-6"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>}
        </button>
        <button onClick={handleCart} className='cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart h-6 w-6 "><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
        </button>
      </div>
      </div>

    </header>
  )
}
