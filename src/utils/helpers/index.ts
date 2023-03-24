import { parseISO, format, sub } from 'date-fns'

export const isoDateFormatter = (date: string): string => {
  return format(parseISO(date), 'MM/dd')
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

const appendEmptyDate = (dataList: IFitnessData[], expectedLength: number, due: Date) => {
  const fitnessMap = new Map()
  dataList.forEach((fitness) => fitnessMap.set(fitness.date, fitness))

  return Array.from({ length: expectedLength })
    .map((n, i) => {
      const date = sub(due, { days: expectedLength - i - 1 }).toISOString()
      return fitnessMap.has(date) ? fitnessMap.get(date) : { date }
    })
}

export const fillDataInPeriod = (period: PeriodTypes, due: Date, dataList = []) => {
  const expectedLength = getExpectedDataLengh(period)
  return expectedLength > dataList.length
    ? appendEmptyDate(dataList, expectedLength, due)
    : dataList
}
