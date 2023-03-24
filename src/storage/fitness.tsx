import { useState, useEffect, useRef } from 'react'
import { sub, startOfDay, parseISO, isBefore, isAfter } from 'date-fns'

import { fillDataInPeriod } from '/src/utils/helpers'
import { readDbByKey, saveToDb, readDbByKeyRange, DbObserver } from './db'
import { IFitnessData, PeriodTypes } from '/src/types'

export const useFitnessByDate = (date: Date) => {
  const [data, setData] = useState<IFitnessData, null>(null)
  useEffect(() => {
    let flag = true
    const readFitnessByDate = async () => {
      const fitness = await readDbByKey('fitness', date.toISOString())
      if (flag) {
        setData(fitness)
      }
    }
    readFitnessByDate()
    return () => {
      flag = false
    }
  }, [date])
  return [data, setData]
}

export const saveFitnessByDate = (data: IFitnessData) => {
  return saveToDb('fitness', data)
}

const getStartDate = (period: PeriodTypes, due: Date) => {
  switch (period) {
    case '7days': return sub(due, { days: 7 })
    case '30days': return sub(due, { months: 1 })
    case 'aSeason': return sub(due, { months: 3 })
    case 'aYear': return sub(due, { years: 1 })
    case 'all': return null
    default: throw new Error('unexpected period')
  }
}

export const useFitnessListByPeriod = (period: PeriodTypes) => {
  const [fitnessList, setFitnessList] = useState([])
  useEffect(() => {
    let flag = true
    const readFitnessListByRange = async () => {
      const due = startOfDay(new Date())
      const start = getStartDate(period, due)
      const dataList = await readDbByKeyRange(
        'fitness', { start: start?.toISOString(), due: due.toISOString() }
      )
      if (flag) {
        const resultList = fillDataInPeriod(period, due, dataList)
        setFitnessList(resultList)
      }
    }
    readFitnessListByRange()
    return () => {
      flag = false
    }
  }, [period])

  const observerIdRef = useRef<string, null>(null)
  useEffect(() => {
    const callback = (data) => {
      if (fitnessList.length < 2) {
        return
      }
      const target = parseISO(data.date)
      const first = parseISO(fitnessList[0].date)
      const last = parseISO(fitnessList[fitnessList.length - 1].date)
      if (!isBefore(target, first) && !isAfter(target, last)) {
        const updatedList = fitnessList
          .map((fitness) => fitness.date === data.date ? data : fitness)
        setFitnessList(updatedList)
      }
    }
    observerIdRef.current = DbObserver.subscribe('fitness', callback)

    return () => {
      DbObserver.unsubscribe(observerIdRef.current)
    }
  }, [fitnessList])

  return fitnessList
}
