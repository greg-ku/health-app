import { isoDateFormatter } from '/src/utils/helpers'
import { IFitnessData, IFitnessChartProps } from '/src/types'
import CustomChart from './CustomChart'

const TotalBodyWaterChart = (props: IFitnessChartProps) => {
  return (
    <CustomChart
      {...props}
      dataKey="totalBodyWater"
      title="總含水率%"
      tickFormatter={isoDateFormatter}
    />
  )
}

export default TotalBodyWaterChart
