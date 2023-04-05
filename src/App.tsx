import { useState, useEffect, Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootPage from './pages/Root'
import './index.css'

const FitnessPage = lazy(() => import('./pages/FitnessPage'))
const WaterIntakePage = lazy(() => import('./pages/WaterIntakePage'))

const router = createBrowserRouter([
  {
    path: '/health-app',
    element: <RootPage />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FitnessPage />
          </Suspense>
        )
      },
      {
        path: 'water-intake',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <WaterIntakePage />
          </Suspense>

        )
      }
    ]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
