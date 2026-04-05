import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { FailureMode } from '../types.js'

interface LambdaMTTRChartProps {
  data: FailureMode[]
  selectedMode: FailureMode | null
  onSelectMode: (mode: FailureMode) => void
}

export default function LambdaMTTRChart({
  data,
  selectedMode,
  onSelectMode,
}: LambdaMTTRChartProps) {
  const chartData = data.map((mode) => ({
    ...mode,
    downtime: mode.lambda * mode.mttr,
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        onClick={(e) => {
          if (e && e.activeTooltipIndex !== undefined) {
            const selected = chartData[e.activeTooltipIndex]
            const mode = data.find((m) => m.id === selected.id)
            if (mode) onSelectMode(mode)
          }
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          type="number"
          dataKey="lambda"
          name="Failure Frequency (λ)"
          stroke="rgba(255,255,255,0.7)"
        />
        <YAxis
          type="number"
          dataKey="mttr"
          name="Mean Time to Repair (min)"
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
        <Scatter
          name="Failure Modes"
          data={chartData}
          fill="#82ca9d"
          fillOpacity={
            selectedMode ? 0.6 : 1
          }
        />
        {selectedMode && (
          <Scatter
            name="Selected Mode"
            data={[chartData.find((m) => m.id === selectedMode.id)]}
            fill="#ff7c7c"
            fillOpacity={1}
          />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  )
}
