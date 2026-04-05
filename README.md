# λ-MTTR Failure Analysis Tool

An interactive web application for **Pareto-based failure mode analysis** in industrial maintenance and reliability engineering. Built with the **λ-MTTR mathematical model** for equipment downtime prioritization.

---

## Overview

This tool implements the **λ-MTTR analysis framework** from "El Arte de Mantener" (R. Pascual, Universidad de Chile), enabling maintenance engineers and RCM specialists to:

- **Visualize failure criticality** using Pareto diagrams
- **Analyze failure rate vs. repair time** trade-offs in scatter plots
- **Prioritize maintenance efforts** based on cumulative downtime
- **Import custom failure data** via JSON files

The formula at the heart of this analysis:

$$D_i = \lambda_i \times MTTR_i$$

Where:
- **D<sub>i</sub>** = Fraction of equipment downtime for failure mode i
- **λ<sub>i</sub>** = Failure frequency (failures per unit time)
- **MTTR<sub>i</sub>** = Mean Time To Repair (minutes)

---

## Features

### 1. **Pareto Priority Diagram**
Interactive visualization ranking failure modes by cumulative downtime contribution. Follows the 80-20 rule to identify critical failure modes requiring immediate maintenance focus.

### 2. **λ-MTTR Scatter Chart**
Two-dimensional analysis showing the relationship between failure frequency and repair time. Identifies which failures consume the most operational capacity.

### 3. **Failure Mode Details Table**
Sortable table displaying all failure metrics:
- Failure code and mode name
- Lambda (failures/ut) and MTTR (minutes)
- Calculated downtime impact (D<sub>i</sub>)
- Visual impact bars for quick reference

### 4. **Data Import**
Upload custom failure mode datasets via JSON files. Supports flexible data structures for seamless integration with existing maintenance databases.

---

## Technical Stack

- **Frontend**: React 19.2 + TypeScript 5.9
- **Build Tool**: Vite 6.1
- **Charting**: Recharts 3.8 (Pareto, scatter, and composed charts)
- **Styling**: CSS Grid + Glassmorphism design
- **Icons**: Lucide React
- **Validation**: Zod (optional, for strict imports)

---

## Installation & Setup

### Prerequisites
- Node.js 20+ (npm or Bun)

### Development

```bash
npm install
npm run dev
```

Runs the app at `http://localhost:5173` with hot module reloading.

### Production Build

```bash
npm run build
npm run preview
```

---

## Data Format

Import failure data as a JSON array. Each failure mode must include:

```json
[
  {
    "id": "1",
    "code": "1",
    "name": "Bearing Failure",
    "description": "Main bearing degradation",
    "lambda": 0.15,
    "mttr": 150
  }
]
```

### Field Definitions
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `code` | string | Failure mode code (for Pareto display) |
| `name` | string | Failure mode name |
| `description` | string | Detailed failure description |
| `lambda` | number | Failure frequency (failures/unit time) |
| `mttr` | number | Mean time to repair (minutes) |

---

## Architecture

```
src/
├── App.tsx                    # Main application component
├── types.ts                   # TypeScript interfaces
├── components/
│   ├── ParetoDiagram.tsx      # Pareto analysis visualization
│   ├── LambdaMTTRChart.tsx    # Scatter plot (λ vs MTTR)
│   ├── FailureModeTable.tsx   # Failure mode details table
│   └── DataImporter.tsx       # JSON file upload
└── data/
    └── sampleFailures.ts      # Default dataset (10 failure modes)
```

---

## Development

### ESLint & Code Quality
```bash
npm run lint
```

### TypeScript Strict Mode
All code adheres to TypeScript `strict: true` configuration.

---

## Model Reference

**Source**: "El Arte de Mantener", Chapter 57: Pareto Analysis for Maintenance Downtime
**Author**: Roberto Pascual, Universidad de Chile  
**Application**: RCM (Reliability-Centered Maintenance), ISO 55001 Asset Management

The λ-MTTR model is fundamental to:
- **RCM task prioritization** (ISO/IEC 60812)
- **Operational reliability** improvement programs
- **Preventive maintenance** planning
- **Asset criticality assessment**

---

## Credits & Attribution

### Development Team
- **Rolando Suárez Lemus**
  - Mechanical Engineer
  - Specialist in Asset Management & Operational Reliability
  - RCM, ISO 55000, Data Analytics
  - Author & Lead Developer

- **GitHub Copilot**
  - AI Assistant for Code Generation & Architecture
  - Claude Haiku 4.5 Model

### Mathematical Framework
- Sourced from peer-reviewed maintenance engineering literature
- Validated against industrial case studies in critical infrastructure

---

## License

This project is provided as-is for educational and industrial maintenance planning purposes.

---

## Support & Further Development

For questions, improvements, or real-world case studies, please contact the development team.

---

**Last Updated**: April 5, 2026  
**Version**: 1.0.0
