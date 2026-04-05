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
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis
          type="number"
          dataKey="lambda"
          name="Failure Frequency (λ)"
          stroke="rgba(255,255,255,0.6)"
          style={{ fontSize: '0.85rem' }}
        />
        <YAxis
          type="number"
          dataKey="mttr"
          name="Mean Time to Repair (min)"
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
          iconType="circle"
        />
        <Scatter
          name="Failure Modes"
          data={chartData}
          fill="#00d4ff"
          fillOpacity={selectedMode ? 0.4 : 0.7}
          style={{ cursor: 'pointer' }}
        />
        {selectedMode && (
          <Scatter
            name="Selected Mode"
            data={[chartData.find((m) => m.id === selectedMode.id)]}
            fill="#ffc658"
            fillOpacity={1}
            style={{ filter: 'drop-shadow(0 0 8px rgba(255, 198, 88, 0.6))' }}
          />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  )
}
