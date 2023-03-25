import { Link } from 'react-router-dom'
import { DocumentChartBarIcon } from '@heroicons/react/24/solid'

import AppLogo from './AppLogo'
import MenuButton from './MenuButton'

interface ISideBarMenuProps {
  isOpen: bool
  onClose: () => void
}

const SideBarMenu = ({ isOpen, onClose }: ISideBarMenuProps) => {
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
          <Link to={`${import.meta.env.BASE_URL}`}>
            <button className="w-full px-6 py-4 text-left flex" onClick={onClose}>
              <DocumentChartBarIcon className="h-6 w-6 mr-2" />
              體重體脂紀錄
            </button>
          </Link>
          <Link to={`${import.meta.env.BASE_URL}/water-intake`}>
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

export default SideBarMenu
