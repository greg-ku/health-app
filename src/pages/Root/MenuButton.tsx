import { Bars3Icon } from '@heroicons/react/24/solid'

interface IMenuButtonProps {
  onClick: () => void
}

const MenuButton = ({ onClick }: IMenuButtonProps) => {
  return (
    <button className="p-4" onClick={onClick}>
      <Bars3Icon className="h-6 w-6" />
    </button>
  )
}

export default MenuButton
