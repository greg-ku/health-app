import { useState } from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/solid'

import { useWaterIntakeByPeriod } from '/src/storage/waterIntake.tsx'
import WaterIntakeEditor from './WaterIntakeEditor'
import WaterIntakeChart from './WaterIntakeChart'

const WaterIntakePage = () => {
  const [now] = useState(new Date())
  const [period, setPeriod] = useState<PeriodTypes>('30days')
  const data = useWaterIntakeByPeriod(period, now)

  return (
    <>
      <div className="grid grid-cols-4 pt-2">
        <div className="col-span-4 md:col-span-3 pr-8 md:pr-4">
          <div className="sticky top-16 bg-white z-10 flex justify-end w-full">
            <button className="p-4 md:hidden">
              <PencilSquareIcon className="h-6 w-6" />
            </button>
          </div>
          <WaterIntakeChart data={data} />
        </div>
        <div className="px-2 hidden md:block">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <WaterIntakeEditor />
          </div>
        </div>
      </div>
    </>
  )
}

export default WaterIntakePage
