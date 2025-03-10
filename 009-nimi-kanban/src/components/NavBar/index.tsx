import { NavLink } from "react-router-dom";
import {Arrows} from "../Icons";
const NavElements = ['Dashboard', 'Boards', 'Teams', 'Configuration']

function NavBar () {
  return (
    <header className="dark:bg-[#222] backdrop-blur-xs bg-white/30 dark:text-white fixed flex justify-between w-full z-10 items-center p-6 text-[#222]">
      <div className="flex items-center gap-4">
        <div className="flex gap-2"><span className="text-xl dark:bg-white bg-[#222] dark:text-[#222] text-white rounded-sm px-1 font-bold tracking-tighter flex items-center">NB</span><p className="text-2xl tracking-tighter font-bold">NimiBoard</p></div>

        <button className="flex items-center border-1 p-2 gap-4 rounded-xl min-w-[200px]">
          <span>Team Nimi</span>
          <Arrows />
        </button>

      </div>
      <nav>
        <ul className="flex gap-2 font-normal text-xl">
          {
            NavElements.map((tab, index) => (
              <li key={index} className="hover:opacity-80 cursor-pointer">
                <NavLink to='/' className={({ isActive }) =>
                isActive
                  ? "border-b-1 "
                  : ""
              }>{tab}</NavLink>              
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
