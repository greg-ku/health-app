import { isoDateFormatter } from '/src/utils/helpers'
import { IFitnessData } from '/src/types'
import CustomChart from '/src/components/CustomChart'

interface IMuscleChartProps {
  data: IFitnessData[]
  height?: number
}

const MuscleChart = (props: IMuscleChartProps) => {
  return (
    <CustomChart
      {...props}
      dataKey="muscle"
      title="肌肉量"
      tickFormatter={isoDateFormatter}
    />
  )
}

export default MuscleChart
