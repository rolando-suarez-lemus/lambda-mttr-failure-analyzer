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
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis 
          type="number" 
          stroke="rgba(255,255,255,0.6)"
          style={{ fontSize: '0.85rem' }}
        />
        <YAxis
          type="category"
          dataKey="code"
          width={40}
          stroke="rgba(255,255,255,0.6)"
          style={{ fontSize: '0.85rem' }}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(10, 22, 40, 0.95)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          }}
          labelStyle={{ color: '#00d4ff', fontWeight: 700 }}
          formatter={(value) =>
            typeof value === 'number' ? value.toFixed(2) : value
          }
        />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="line"
        />
        <Bar
          dataKey="lambda"
          fill="url(#barGradient)"
          fillOpacity={selectedMode ? 0.5 : 0.85}
          onClick={(e) => onSelectMode(data[e.index])}
          style={{ cursor: 'pointer' }}
        />
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity={1} />
            <stop offset="100%" stopColor="#0099ff" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="cumulativePercent"
          stroke="#ffc658"
          strokeWidth={3}
          yAxisId="right"
          name="Cumulative %"
          dot={{ fill: '#ffc658', r: 4 }}
          activeDot={{ r: 6 }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="rgba(255,255,255,0.6)"
          style={{ fontSize: '0.85rem' }}
          domain={[0, 100]}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
