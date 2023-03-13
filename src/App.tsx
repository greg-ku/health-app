import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SplashScreen from './SplashScreen'
import RootPage from './pages/Root'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />
  },
])

function App() {
  const [showSplash, setShowSplash] = useState(true)
  useEffect(() => {
    let timeout = null
    if (showSplash) {
      timeout = setTimeout(() => setShowSplash(false), 500)
    }
    return () => clearTimeout(timeout)
  }, [])

  return showSplash
    ? <SplashScreen/>
    : <RouterProvider router={router} />
}

export default App
