import { useState } from 'react'
import { startOfDay } from 'date-fns'

import { fillDataInPeriod } from '/src/utils/helpers'

export const useWaterIntakeByPeriod = (period: PeriodTypes, now: Date) => {
  const due = startOfDay(now)
  const [waterIntake, setWaterIntake] = useState(fillDataInPeriod(period, due))
  return waterIntake
}
