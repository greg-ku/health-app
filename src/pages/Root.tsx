import { useState } from 'react'

import FitnessEditor from '/src/components/FitnessEditor'
import WeightChart from '/src/components/WeightChart'
import BodyFatChart from '/src/components/BodyFatChart'
import MuscleChart from '/src/components/MuscleChart'
import { useFitnessListByPeriod } from '/src/storage/fitness'

const Root = () => {
  const [period, setPeriod] = useState<string>('30days')
  const data = useFitnessListByPeriod(period)

  return (
    <>
      <div className="h-16 fixed flex items-center w-full px-2 border-b border-gray-200 bg-white z-10">
        <img src="/vite.svg" className="w-10 h-10" alt="Vite logo" />
        <div className="text-3xl font-bold">
          Health App
        </div>
      </div>
      <div className="pt-16">
        <div className="flex pt-2">
          <div className="grow">
            <WeightChart data={data} height={400} />
            <BodyFatChart data={data} height={400} />
            <MuscleChart data={data} height={400} />
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
