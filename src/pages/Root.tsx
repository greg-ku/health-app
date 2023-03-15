import FitnessEditor from '/src/components/FitnessEditor'

const Root = () => {
  return (
    <>
      <div className="h-16 fixed flex items-center w-full px-2 border-b border-gray-200">
        <img src="/vite.svg" className="w-10 h-10" alt="Vite logo" />
        <div className="text-3xl font-bold">
          Health App
        </div>
      </div>
      <div className="pt-16">
        <div className="flex pt-2">
          <div className="grow">
          </div>
          <div className="w-1/4 px-2">
            <div className="text-xl font-bold">編輯</div>
            <FitnessEditor />
          </div>
        </div>
      </div>
    </>
  )
}

export default Root
