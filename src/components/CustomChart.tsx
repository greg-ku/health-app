import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts'

interface IChartProps {
  data: IFitnessData[]
  dataKey: string
  color?: string
  height?: number
  title?: string
  tickFormatter?: (s: string) => string
}

const CustomChart = ({ data, dataKey, color, height, title, tickFormatter }: IChartProps) => {
  return (
    <>
      {title && <div className="text-xl font-bold ml-8">{title}</div>}
      <ResponsiveContainer weight="100%" height={height || 400}>
        <LineChart data={data}>
          <XAxis dataKey="date" tickFormatter={tickFormatter} />
          <YAxis />
          <Line type="monotone" dataKey={dataKey} stroke={color || '#8884d8'} />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default CustomChart
