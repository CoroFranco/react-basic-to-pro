import { NavLink } from 'react-router-dom'
import './style.css'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Contexts'

export default function Navbar () {
  const { count } = useContext(ShoppingCartContext)
  const categories = [
    { name: 'All', path: '/' },
    { name: 'Clothes', path: '/clothes' },
    { name: 'Electronic', path: '/electronic' },
    { name: 'toys', path: '/toys' }
  ]
  const routes = [
    { name: 'My Orders', path: '/my-orders' },
    { name: 'My Account', path: '/my-account' },
    { name: 'Sign In', path: '/sign-in' }
  ]

  const activeStyle = 'underline underline-offset-4'

  return (
    <nav className='bg-white/50 backdrop-blur-sm flex justify-between items-center sticky z-10 w-full py-5 px-8 font-normal text-md top-0'>
      <ul className='flex items-center gap-3'>
        <li className='font-extrabold text-lg'>
          <NavLink to='/'>
            Nimi
          </NavLink>
        </li>
        {
          categories.map(category => (
            <li key={category.name}>
              <NavLink
                to={category.path}
                className={({ isActive }) => isActive ? activeStyle : undefined}
              >
                {category.name}
              </NavLink>
            </li>
          ))
        }
      </ul>
      <ul className='flex items-center gap-3'>
        <li className='text-black/50'>
          correo
        </li>
        {
            routes.map(route => (
              <li key={route.name}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) => isActive ? activeStyle : undefined}
                >
                  {route.name}
                </NavLink>
              </li>
            ))
          }
        <li>
          {count}
        </li>
      </ul>

    </nav>
  )
}
