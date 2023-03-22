import { isoDateFormatter } from '/src/utils/helpers'
import { IFitnessData, IFitnessChartProps } from '/src/types'
import CustomChart from './CustomChart'

const WeightChart = (props: IFitnessChartProps) => {
  return (
    <CustomChart
      {...props}
      dataKey="visceralFat"
      title="內臟脂肪"
      tickFormatter={isoDateFormatter}
    />
  )
}

export default WeightChart
