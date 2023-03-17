import { useState, useEffect, useRef } from 'react'
import { sub, startOfDay, parseISO, isBefore, isAfter } from 'date-fns'

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

const getExpectedDataLengh = (period: PeriodTypes) => {
  switch (period) {
    case '7days': return 7
    case '30days': return 30
    case 'aSeason': return 90
    case 'aYear': return 365
    case 'all': return 30
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
        const expectedLength = getExpectedDataLengh(period)
        const resultList = expectedLength > dataList.length
          ? Array.from({ length: expectedLength - dataList.length })
            .map((n, i) => {
              const lastDate = dataList[dataList.length - 1]?.date
                ? parseISO(dataList[dataList.length - 1]?.date)
                : startOfDay(new Date())
              return { date: sub(lastDate, { days: expectedLength - i }).toISOString() }
            })
            .concat(dataList)
          : dataList
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
