export interface IFitnessData {
  weight?: number
  bodyFat?: number
  muscle?: number
  date: Date
  createdAt?: Date
}

export type PeriodTypes = '7days' | '30days' | 'aSeason' | 'aYear' | 'all'
