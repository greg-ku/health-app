import { startOfDay } from 'date-fns'

import { fillDataInPeriod } from '/src/utils/helpers'
import { saveToDb, readDbByKey, useDateDataListByPeriod } from './db'

export const addWaterIntakeToDate = async (waterIntake: IWaterIntakeLog, date: Date) => {
  const savedDate = startOfDay(date).toISOString()
  const dataRead = await readDbByKey('waterIntake', savedDate)
  await saveToDb(
    'waterIntake',
    {
      ...dataRead,
      total: (dataRead?.total || 0) + waterIntake.value,
      logs: (dataRead?.logs || []).concat([waterIntake]),
      date: dataRead?.date || savedDate
    }
  )
}

export const useWaterIntakeByPeriod = (period: PeriodTypes, now: Date) => {
  const due = startOfDay(now)
  return useDateDataListByPeriod('waterIntake', period, now, fillDataInPeriod(period, due))
}
