import { saveToDb, useDateDataByDate, useDateDataListByPeriod } from './db'
import { IFitnessData, PeriodTypes } from '/src/types'

export const useFitnessByDate = (date: Date) => {
  return useDateDataByDate<IFitnessData>('fitness', date)
}

export const saveFitnessByDate = (data: IFitnessData) => {
  return saveToDb('fitness', data)
}

export const useFitnessListByPeriod = (period: PeriodTypes, now: Date) => {
  return useDateDataListByPeriod('fitness', period, now, [])
}
