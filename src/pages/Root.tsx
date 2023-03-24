import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Root = () => {
  return (
    <>
      <div className="h-16 fixed flex items-center w-full px-2 border-b border-gray-200 bg-white z-20">
        <img src={`${import.meta.env.BASE_URL}/vite.svg`} className="w-10 h-10" alt="Vite logo" />
        <div className="text-3xl font-bold">
          Health App
        </div>
      </div>
      <div className="pt-16">
        <Outlet />
      </div>

      <ToastContainer />
    </>
  )
}

export default Root
