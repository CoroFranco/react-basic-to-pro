import { useRoutes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Boards from './pages/Board'
import Teams from './pages/Teams'
import Config from './pages/Config'
import { ThemeProvider } from 'next-themes'
import Layout from './components/Layout'

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/boards', element: <Boards />},
    { path: '/teams', element: <Teams />},
    { path: '/config', element: <Config />}
  ])

  return routes
}


function App() {


  return (
    <BrowserRouter>  
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Layout>
        <AppRoutes />
      </Layout>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
