import { isoDateFormatter } from '/src/utils/helpers'
import { IFitnessData, IFitnessChartProps } from '/src/types'
import CustomChart from './CustomChart'

const WeightChart = (props: IFitnessChartProps) => {
  return (
    <CustomChart
      {...props}
      dataKey="basalMetabolicRate"
      title="基礎代謝率"
      tickFormatter={isoDateFormatter}
    />
  )
}

export default WeightChart
