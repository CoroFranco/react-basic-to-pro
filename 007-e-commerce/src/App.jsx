import './App.css'

function App() {


  return (
    <div className='dark:bg-[#222] h-screen '>
    <header className='flex justify-between max-w-[1200px] mx-auto pt-[10px]'>
      <h1 className='text-2xl font-bold dark:text-white text-[#222]'>NimiStore</h1>
      <div className='relative flex'>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        <input className="flex h-10 w-full rounded-md  px-3 py-2 text-sm  pl-8 md:w-[300px] lg:w-[500px]" placeholder="Search products..." type="search" />
        </div>
      <div>
        <button className=''>
          🥮 
        </button>
        <button>
          🥕 
        </button>
      </div>
      </div>

    </header>
    </div>
  )
}

export default App
