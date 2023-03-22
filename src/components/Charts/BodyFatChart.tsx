import { isoDateFormatter } from '/src/utils/helpers'
import { IFitnessData } from '/src/types'
import CustomChart from './CustomChart'

interface IBodyFatChartProps {
  data: IFitnessData[]
  height?: number
}

const BodyFatChart = (props: IBodyFatChartProps) => {
  return (
    <CustomChart
      {...props}
      dataKey="bodyFat"
      title="體脂肪"
      tickFormatter={isoDateFormatter}
    />
  )
}

export default BodyFatChart
