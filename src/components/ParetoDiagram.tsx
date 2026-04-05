import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { ParetoDataPoint } from '../types.js'

interface ParetoDiagramProps {
  data: ParetoDataPoint[]
  selectedMode: any
  onSelectMode: (mode: any) => void
}

export default function ParetoDiagram({
  data,
  selectedMode,
  onSelectMode,
}: ParetoDiagramProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis type="number" stroke="rgba(255,255,255,0.7)" />
        <YAxis
          type="category"
          dataKey="code"
          width={40}
          stroke="rgba(255,255,255,0.7)"
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
          formatter={(value) =>
            typeof value === 'number' ? value.toFixed(2) : value
          }
        />
        <Legend />
        <Bar
          dataKey="lambda"
          fill="#82ca9d"
          fillOpacity={
            selectedMode ? 0.6 : 0.8
          }
          onClick={(e) => onSelectMode(data[e.index])}
        />
        <Line
          type="monotone"
          dataKey="cumulativePercent"
          stroke="#ffc658"
          yAxisId="right"
          name="Cumulative %"
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="rgba(255,255,255,0.7)"
          domain={[0, 100]}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
