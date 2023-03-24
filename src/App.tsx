import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootPage from './pages/Root'
import FitnessPage from './pages/FitnessPage'
import WaterIntakePage from './pages/WaterIntakePage'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/health-app',
    element: <RootPage />,
    children: [
      {
        path: '',
        element: <FitnessPage/>
      },
      {
        path: 'water-intake',
        element: <WaterIntakePage/>
      }
    ]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
