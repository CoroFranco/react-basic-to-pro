import { useRoutes, BrowserRouter } from 'react-router-dom'
import NavBar from "./components/NavBar"
import Home from './pages/Home'
import Boards from './pages/Board'

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/board', element: <Boards />}
  ])

  return routes
}


function App() {

  return (
    <BrowserRouter>  
    <main className="h-[2000px] relative bg-gray-200   dark:bg-neutral-900">
     <NavBar />
     <AppRoutes />
    </main>
    </BrowserRouter>
  )
}

export default App
