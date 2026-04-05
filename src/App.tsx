import { useState } from 'react'
import './App.css'
import './components/index.css'
import ParetoDiagram from './components/ParetoDiagram.js'
import LambdaMTTRChart from './components/LambdaMTTRChart.js'
import FailureModeTable from './components/FailureModeTable.js'
import DataImporter from './components/DataImporter.js'
import { FailureMode } from './types.js'
import { sampleData } from './data/sampleFailures.js'

function App() {
  const [failureModes, setFailureModes] = useState<FailureMode[]>(sampleData)
  const [selectedMode, setSelectedMode] = useState<FailureMode | null>(null)

  const handleImportData = (data: FailureMode[]) => {
    setFailureModes(data)
    setSelectedMode(null)
  }

  // Calculate cumulative percentage for Pareto
  const sortedByDowntime = [...failureModes].sort(
    (a, b) =>
      b.lambda * b.mttr - a.lambda * a.mttr
  )

  const totalDowntime = sortedByDowntime.reduce(
    (sum, mode) => sum + mode.lambda * mode.mttr,
    0
  )

  const paretoData = sortedByDowntime.map((mode, idx) => ({
    ...mode,
    cumulativeDowntime: sortedByDowntime
      .slice(0, idx + 1)
      .reduce((sum, m) => sum + m.lambda * m.mttr, 0),
    cumulativePercent:
      (sortedByDowntime
        .slice(0, idx + 1)
        .reduce((sum, m) => sum + m.lambda * m.mttr, 0) /
        totalDowntime) *
      100,
  }))

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>λ-MTTR Failure Analysis</h1>
        <p className="subtitle">
          Interactive Pareto Analysis for Industrial Maintenance & RCM
        </p>
        <div className="credits">
          <p>
            Developed by <strong>Rolando Suárez Lemus</strong>
            <br />
            Mechanical Engineer | Asset Management & RCM Specialist
            <br />
            Operational Reliability (ISO 55000, RCM) | Data Analytics
            <br />
            <em>with GitHub Copilot assistance | UI Protocol: Lumina ID-LUM-001</em>
          </p>
        </div>
      </header>

      <main className="app-main">
        <section className="controls-section">
          <DataImporter onImport={handleImportData} />
        </section>

        <section className="visualization-grid">
          <div className="chart-panel">
            <h2>Pareto Priority Analysis</h2>
            <ParetoDiagram
              data={paretoData}
              onSelectMode={setSelectedMode}
              selectedMode={selectedMode}
            />
          </div>

          <div className="chart-panel">
            <h2>λ (Failures/Unit Time) vs MTTR (Repair Time)</h2>
            <LambdaMTTRChart
              data={failureModes}
              onSelectMode={setSelectedMode}
              selectedMode={selectedMode}
            />
          </div>
        </section>

        <section className="table-section">
          <h2>Failure Mode Details</h2>
          <FailureModeTable
            data={failureModes}
            selectedMode={selectedMode}
            onSelectMode={setSelectedMode}
          />
        </section>

        <section className="info-section">
          <h3>About the Model</h3>
          <p>
            The λ-MTTR (Lambda-MTTR) analysis combines failure frequency (λ) with
            mean time to repair (MTTR) to prioritize maintenance efforts. This
            Pareto-based approach helps identify which failure modes consume the
            most operational downtime.
          </p>
          <p>
            <strong>Key Formula:</strong> D<sub>i</sub> = λ<sub>i</sub> ×
            MTTR<sub>i</sub>
            <br />
            where D<sub>i</sub> = Fraction of equipment downtime for failure mode i
          </p>
          <p>
            <strong>Mathematical Foundation:</strong> Derived from "El Arte de Mantener" 
            by R. Pascual (Universidad de Chile). Implements ISO 55001 Asset Management 
            and RCM (Reliability-Centered Maintenance) best practices.
          </p>
          <p className="model-source">
            Reference: Chapter 57 - Pareto Analysis for Maintenance Downtime Prioritization
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
