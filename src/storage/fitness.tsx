import { useState, useEffect } from 'react'
import { readFromDb, saveToDb } from './db'
import { IFitnessData } from '/src/types'

export const useFitnessByDate = (date: Date) => {
  const [data, setData] = useState<IFitnessData, null>(null)
  useEffect(() => {
    let flag = true
    const readFitnessByDate = async () => {
      const fitness = await readFromDb('fitness', date.toISOString())
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
