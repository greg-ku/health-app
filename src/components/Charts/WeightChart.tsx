import { isoDateFormatter } from '/src/utils/helpers'
import { IFitnessData } from '/src/types'
import CustomChart from './CustomChart'

interface IWeightChartProps {
  data: IFitnessData[]
  height?: number
}

const WeightChart = (props: IWeightChartProps) => {
  return (
    <CustomChart
      {...props}
      dataKey="weight"
      title="體重"
      tickFormatter={isoDateFormatter}
    />
  )
}

export default WeightChart
