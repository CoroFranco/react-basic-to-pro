export default function Nav () {
  return (
    <aside className='flex gap-6 p-6 flex-col bg-gray-800 text-white w-64'>
        <h2 className='font-bold text-2xl'>Task-nimi</h2>
        <nav>
          <ul className='flex gap-2 flex-col'>
            <li className=''><a className='px-4 py-2 hover:bg-white hover:text-gray-800 transition-all duration-100 ease-in inline-flex w-full rounded-xl' href="/">+ Boards</a></li>
            <li><a className='px-4 py-2 hover:bg-white hover:text-gray-800 transition-all ease-in inline-flex w-full rounded-xl' href="/">+ Tasks</a></li>
            <li><a className='px-4 py-2 hover:bg-white hover:text-gray-800 transition-all ease-in inline-flex w-full rounded-xl' href="/">+ Settings</a></li>
          </ul>
        </nav>
      </aside>
  )
}
