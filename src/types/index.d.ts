export interface IFitnessData {
  weight?: number
  bodyFat?: number
  muscle?: number
  date: Date
  createdAt?: Date
}

export interface IFitnessChartProps {
  data: IFitnessData[]
  height?: number
}

export type PeriodTypes = '7days' | '30days' | 'aSeason' | 'aYear' | 'all'

export interface IWaterIntakeLog {
  total: number
  type: string
}

export interface IWaterIntakeData {
  total: number
  logs: IWaterIntakeLog[]
  date: Date
}
