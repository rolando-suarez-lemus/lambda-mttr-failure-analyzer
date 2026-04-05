import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'
import { FailureMode } from '../types.js'

interface DataImporterProps {
  onImport: (data: FailureMode[]) => void
}

export default function DataImporter({ onImport }: DataImporterProps) {
  const [importing, setImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImporting(true)
    try {
      const text = await file.text()
      const json = JSON.parse(text)

      if (Array.isArray(json)) {
        onImport(json)
        alert(`Successfully imported ${json.length} failure modes`)
      }
    } catch (error) {
      alert('Failed to parse JSON file. Make sure it contains an array of failure modes.')
    } finally {
      setImporting(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="data-importer">
      <h3>Import Failure Data</h3>
      <div className="import-controls">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={importing}
          className="import-button"
        >
          <Upload size={16} />
          {importing ? 'Importing...' : 'Import JSON File'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <p className="import-hint">
          Upload a JSON file with failure mode data containing: id, name, lambda, mttr
        </p>
      </div>
    </div>
  )
}
