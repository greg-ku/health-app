import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts'
import { parseISO, format } from 'date-fns'

import { IFitnessData } from '/src/types'

interface IWeightChartProps {
  data: IFitnessData[]
  height?: number
}

const isoDateFormatter = (date: string): string => {
  return format(parseISO(date), 'MM/dd')
}

const WeightChart = ({ data, height }: IWeightChartProps) => {
  return (
    <>
      <div className="text-xl font-bold ml-8">體重</div>
      <ResponsiveContainer weight="100%" height={height || 400}>
        <LineChart data={data}>
          <XAxis dataKey="date" tickFormatter={isoDateFormatter} />
          <YAxis />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default WeightChart
