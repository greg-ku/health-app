import { useState } from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import Modal from 'react-modal'

import FitnessEditor from '/src/components/FitnessEditor'
import WeightChart from '/src/components/Charts/WeightChart'
import BodyFatChart from '/src/components/Charts/BodyFatChart'
import BoneMassChart from '/src/components/Charts/BoneMassChart'
import TotalBodyWaterChart from '/src/components/Charts/TotalBodyWaterChart'
import MuscleChart from '/src/components/Charts/MuscleChart'
import BodyMassScoreChart from '/src/components/Charts/BodyMassScoreChart'
import BasalMetabolicRateChart from '/src/components/Charts/BasalMetabolicRateChart'
import PhysicalAgeChart from '/src/components/Charts/PhysicalAgeChart'
import VisceralFatChart from '/src/components/Charts/VisceralFatChart'
import { useFitnessListByPeriod } from '/src/storage/fitness'

Modal.setAppElement('#my-app-modal')

const FitnessPage = () => {
  const [period, setPeriod] = useState<string>('30days')
  const data = useFitnessListByPeriod(period)

  const [fitnessEditModal, setFitnessEditModal] = useState({ show: false })
  const onEditFitnessClick = () => setFitnessEditModal({ show: true })

  return (
    <>
      <div className="grid grid-cols-4 pt-2">
        <div className="col-span-4 md:col-span-3 pr-8 md:pr-4">
          <div className="sticky top-16 bg-white z-10 flex justify-end w-full">
            <button className="p-4 md:hidden" onClick={onEditFitnessClick}>
              <PencilSquareIcon className="h-6 w-6" />
            </button>
          </div>
          <WeightChart data={data} height={400} />
          <BodyFatChart data={data} height={400} />
          <BoneMassChart data={data} height={400} />
          <TotalBodyWaterChart data={data} height={400} />
          <MuscleChart data={data} height={400} />
          <BodyMassScoreChart data={data} height={400} />
          <BasalMetabolicRateChart data={data} height={400} />
          <PhysicalAgeChart data={data} height={400} />
          <VisceralFatChart data={data} height={400} />
        </div>
        <div className="px-2 hidden md:block">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="text-xl font-bold">編輯</div>
            <FitnessEditor />
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

export default FitnessPage
