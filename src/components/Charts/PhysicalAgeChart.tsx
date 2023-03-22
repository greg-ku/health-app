import { isoDateFormatter } from '/src/utils/helpers'
import { IFitnessData, IFitnessChartProps } from '/src/types'
import CustomChart from './CustomChart'

const WeightChart = (props: IFitnessChartProps) => {
  return (
    <CustomChart
      {...props}
      dataKey="physicalAge"
      title="身體年齡"
      tickFormatter={isoDateFormatter}
    />
  )
}

export default WeightChart
