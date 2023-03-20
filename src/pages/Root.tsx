import { useState } from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import Modal from 'react-modal'

import FitnessEditor from '/src/components/FitnessEditor'
import WeightChart from '/src/components/WeightChart'
import BodyFatChart from '/src/components/BodyFatChart'
import MuscleChart from '/src/components/MuscleChart'
import { useFitnessListByPeriod } from '/src/storage/fitness'

Modal.setAppElement('#my-app-modal')

const Root = () => {
  const [period, setPeriod] = useState<string>('30days')
  const data = useFitnessListByPeriod(period)

  const [fitnessEditModal, setFitnessEditModal] = useState({ show: false })
  const onEditFitnessClick = () => setFitnessEditModal({ show: true })

  return (
    <>
      <div className="h-16 fixed flex items-center w-full px-2 border-b border-gray-200 bg-white z-20">
        <img src="/vite.svg" className="w-10 h-10" alt="Vite logo" />
        <div className="text-3xl font-bold">
          Health App
        </div>
      </div>
      <div className="pt-16">
        <div className="grid grid-cols-4 pt-2">
          <div className="col-span-4 md:col-span-3 pr-8 md:pr-4">
            <div className="sticky top-16 bg-white z-10 flex justify-end w-full">
              <button className="p-4 md:hidden" onClick={onEditFitnessClick}>
                <PencilSquareIcon className="h-6 w-6" />
              </button>
            </div>
            <WeightChart data={data} height={400} />
            <BodyFatChart data={data} height={400} />
            <MuscleChart data={data} height={400} />
          </div>
          <div className="px-2 hidden md:block">
            <div className="sticky top-16">
              <div className="text-xl font-bold">編輯</div>
              <FitnessEditor />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={fitnessEditModal.show}
        onRequestClose={() => setFitnessEditModal({ show: false })}
      >
        <FitnessEditor onSavedFinished={() => setFitnessEditModal({ show: false })}/>
      </Modal>
    </>
  )
}

export default Root
