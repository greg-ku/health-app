import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Bars3Icon, DocumentChartBarIcon } from '@heroicons/react/24/solid'

const AppLogo = () => {
  return (
    <>
      <img src={`${import.meta.env.BASE_URL}/vite.svg`} className="w-10 h-10" alt="Vite logo" />
      <div className="text-3xl font-bold">
        Health App
      </div>
    </>
  )
}

const MenuButton = ({ onClick }) => {
  return (
    <button className="p-4" onClick={onClick}>
      <Bars3Icon className="h-6 w-6" />
    </button>
  )
}

const SideBarMenu = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null
  }

  const preventEventPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-white/[0.4]" onClick={onClose}>
      <div className="absolute top-0 left-0 bottom-0 w-72 bg-white" onClick={preventEventPropagation}>
        <div className="h-16 flex items-center px-2 border-b border-gray-200">
          <MenuButton onClick={onClose} />
          <AppLogo />
        </div>

        <div className="w-full h-full flex flex-col items-start border-r border-gray-200">
          <Link to="/health-app">
            <button className="w-full px-6 py-4 text-left flex" onClick={onClose}>
              <DocumentChartBarIcon className="h-6 w-6 mr-2" />
              體重體脂紀錄
            </button>
          </Link>
          <Link to="/health-app/water-intake">
            <button className="w-full px-6 py-4 text-left flex" onClick={onClose}>
              <DocumentChartBarIcon className="h-6 w-6 mr-2" />
              飲水紀錄
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const Root = () => {
  const [menuOpen, setMenuOpen] = useState<bool>(false)
  const onMenuToggle = () => setMenuOpen((prevValue) => !prevValue)

  return (
    <>
      <div className="h-16 fixed flex items-center w-full px-2 border-b border-gray-200 bg-white z-20">
        <MenuButton onClick={onMenuToggle} />
        <AppLogo />
      </div>
      <div className="pt-16">
        <Outlet />
      </div>

      <SideBarMenu isOpen={menuOpen} onClose={onMenuToggle} />

      <ToastContainer />
    </>
  )
}

export default Root
