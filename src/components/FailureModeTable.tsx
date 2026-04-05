import { FailureMode } from '../types.js'

interface FailureModeTableProps {
  data: FailureMode[]
  selectedMode: FailureMode | null
  onSelectMode: (mode: FailureMode) => void
}

export default function FailureModeTable({
  data,
  selectedMode,
  onSelectMode,
}: FailureModeTableProps) {
  const sortedData = [...data].sort((a, b) => b.lambda * b.mttr - a.lambda * a.mttr)

  return (
    <div className="table-wrapper">
      <table className="failure-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Failure Mode</th>
            <th>λ (failures/ut)</th>
            <th>MTTR (min)</th>
            <th>D<sub>i</sub> = λ×MTTR</th>
            <th>Impact</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((mode) => {
            const downtime = mode.lambda * mode.mttr
            const isSelected = selectedMode?.id === mode.id
            return (
              <tr
                key={mode.id}
                className={`failure-row ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectMode(mode)}
              >
                <td>{mode.code}</td>
                <td>
                  <div className="mode-name">{mode.name}</div>
                  <div className="mode-description">{mode.description}</div>
                </td>
                <td className="numeric">{mode.lambda.toFixed(3)}</td>
                <td className="numeric">{mode.mttr.toFixed(0)}</td>
                <td className="numeric numeric-highlight">
                  {downtime.toFixed(2)}
                </td>
                <td>
                  <div className="impact-bar">
                    <div
                      className="impact-fill"
                      style={{
                        width: `${(downtime / Math.max(...sortedData.map((m) => m.lambda * m.mttr))) * 100}%`,
                      }}
                    />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
