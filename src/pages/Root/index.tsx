import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import AppLogo from './AppLogo'
import MenuButton from './MenuButton'
import SideBarMenu from './SideBarMenu'

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
