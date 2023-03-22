import { isoDateFormatter } from '/src/utils/helpers'
import { IFitnessData, IFitnessChartProps } from '/src/types'
import CustomChart from './CustomChart'

const BoneMassChart = (props: IFitnessChartProps) => {
  return (
    <CustomChart
      {...props}
      dataKey="boneMass"
      title="推定骨量"
      tickFormatter={isoDateFormatter}
    />
  )
}

export default BoneMassChart
