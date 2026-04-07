# Prioritización de Modos de Falla mediante λ-MTTR

## Problema Operativo

En sistemas con múltiples modos de falla, la asignación de recursos de mantenimiento debe reducir incertidumbre sobre cuál falla contribuye más al tiempo fuera de servicio del equipo. Sin criterio explícito, los esfuerzos se dispersan entre síntomas de baja criticidad.

El λ-MTTR estructura cómo cuantificar el impacto operativo de cada modo:

$$D_i = \lambda_i \times MTTR_i$$

Donde:
- **D<sub>i</sub>** = Fracción del tiempo de inactividad atribuible a modo i
- **λ<sub>i</sub>** = Frecuencia de falla (eventos por unidad de tiempo)
- **MTTR<sub>i</sub>** = Tiempo medio de reparación (minutos)

Esta métrica revela que un fallo frecuente pero rápido de reparar puede ser menos crítico que un fallo raro pero de reparación lenta. El análisis Pareto sobre D_i identifica dónde concentrar inversión en prevención.


---

## Estructura del Análisis

### 1. Rank Pareto por Impacto Acumulado
Ordena modos por D_i descendente. El 20% superior típicamente explica 80% del tiempo de inactividad. Esto establece el criterio de inversión para prevención (cambio de componentes, rediseño, redundancia).

### 2. Diagrama λ vs MTTR
Scatter 2D revela la estructura de criticidad:
- **Alta λ, Alta MTTR**: Máxima prioridad (ambos factores agravan impacto)
- **Alta λ, Baja MTTR**: Monitor; el tiempo de reparación rápida mitiga
- **Baja λ, Alta MTTR**: Riesgo latente; intervención preventiva es eficiente
- **Baja λ, Baja MTTR**: Gestión según disponibilidad

### 3. Importación de Datos
Integración directa con bases de datos operacionales. Permite comparar múltiples equipos o períodos y cuantificar mejora post-intervención.

---

## Formato de Datos

Importar como array JSON. Cada modo debe incluir:

```json
[
  {
    "id": "1",
    "code": "01",
    "name": "Falla de rodamiento",
    "description": "Degradación material en rodamiento principal",
    "lambda": 0.15,
    "mttr": 150
  }
]
```

| Campo | Tipo | Definición |
|-------|------|-----------|
| `id` | string | Identificador único |
| `code` | string | Código para seguimiento Pareto |
| `name` | string | Modo de falla |
| `lambda` | number | Frecuencia (eventos/ut) |
| `mttr` | number | Tiempo reparación (minutos) |

---

## Arquitectura

```
src/
├── App.tsx
├── components/
│   ├── ParetoDiagram.tsx      # Ranking acumulado
│   ├── LambdaMTTRChart.tsx    # Scatter λ vs MTTR
│   ├── FailureModeTable.tsx   # Tabla de modos
│   └── DataImporter.tsx       # JSON import
└── data/
    └── sampleFailures.ts
```

---

## Stack Técnico

- **React 19.2** + TypeScript 5.9 (strict)
- **Vite 6.1** + HMR
- **Recharts 3.8**: Pareto y scatter
- **CSS Grid** + Glasmorphism
- **Lucide React**: Iconografía

---

## Instalación

```bash
npm install
npm run dev
# http://localhost:5173

npm run build
npm run preview
```

---

## Impacto Operativo

### Reducción de Incertidumbre
Estructurar modos de falla bajo λ-MTTR elimina decisiones basadas en creencias. El Pareto fuerza la concentración de recursos donde el impacto es cuantificable.

### Mejora de Disponibilidad
Si el 20% de modos consume 80% del tiempo de inactividad, intervención enfocada en esos modos (rediseño, componentes de mayor confiabilidad) impacta directamente en A₀ (disponibilidad operacional).

### Referencia Histórica
Guardar análisis λ-MTTR por período permite auditar si las intervenciones redujeron efectivamente D_i o solo redistribuyeron fallos.

---

## Referencias

- **Pascual, R.** (2008): "El Arte de Mantener" (3ª ed.), Cap. 57: Análisis Pareto de Inactividad, Universidad de Chile
- **ISO 55000**: Asset Management — Overview, principles and terminology
- **ISO 55001**: Asset Management — Management systems — Requirements
- **ISO/IEC 60812**: Failure modes and effects analysis (FMEA) and criticality analysis
- **Ramakumar, R.** (1993): Engineering Reliability: Fundamentals and Applications, Prentice Hall

---

## Equipo

**Rolando Suárez Lemus**  
Ingeniero Mecánico | Especialista en Confiabilidad Operacional y Gestión de Activos  
ISO 55000, RCM, Automatización

GitHub: [@rolando-suarez-lemus](https://github.com/rolando-suarez-lemus)

---

**Versión**: 1.0.0 | Abril 2026
