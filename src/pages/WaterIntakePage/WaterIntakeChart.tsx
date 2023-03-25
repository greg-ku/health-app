import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

import { isoDateFormatter } from '/src/utils/helpers'

const WaterIntakeChart = ({ data }) => {
  return (
    <>
      <div className="text-xl font-bold ml-8">飲水量</div>
      <ResponsiveContainer weight="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="date" tickFormatter={isoDateFormatter} />
          <YAxis />
          <Tooltip labelFormatter={isoDateFormatter} />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default WaterIntakeChart
