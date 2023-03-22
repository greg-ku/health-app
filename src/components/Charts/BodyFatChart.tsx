import { isoDateFormatter } from '/src/utils/helpers'
import { IFitnessData, IFitnessChartProps } from '/src/types'
import CustomChart from './CustomChart'

const BodyFatChart = (props: IFitnessChartProps) => {
  return (
    <CustomChart
      {...props}
      dataKey="bodyFat"
      title="體脂率%"
      tickFormatter={isoDateFormatter}
    />
  )
}

export default BodyFatChart
