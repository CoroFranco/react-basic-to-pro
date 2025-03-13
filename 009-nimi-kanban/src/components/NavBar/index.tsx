import { NavLink } from "react-router-dom";
import { Arrows } from "../Icons";

const NavElements = [
  { name: 'Dashboard', path: '/' }, 
  { name: 'Boards', path: '/boards' }, 
  { name: 'Teams', path: '/teams' }, 
  { name: 'Configuration', path: '/config' }
];

function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 dark:bg-neutral-900/90 border-b border-gray-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Team Selector */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">NB</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                NimiBoard
              </span>
            </div>
            
            {/* Team Selector */}
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 
              bg-gray-100 dark:bg-neutral-800 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-700 
              border border-gray-200 dark:border-neutral-700 transition-colors">
              <span>Team Nimi</span>
              <Arrows />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {NavElements.map((tab, index) => (
                <li key={index}>
                  <NavLink 
                    to={tab.path} 
                    className={({ isActive }) =>
                      `py-2 text-sm font-medium transition-colors relative ${
                        isActive 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {tab.name}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Button (hidden in this example) */}
          <button className="md:hidden rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
