import { isoDateFormatter } from '/src/utils/helpers'
import { IFitnessData, IFitnessChartProps } from '/src/types'
import CustomChart from './CustomChart'

const WeightChart = (props: IFitnessChartProps) => {
  return (
    <CustomChart
      {...props}
      dataKey="bodyMassScore"
      title="體質分數"
      tickFormatter={isoDateFormatter}
    />
  )
}

export default WeightChart
