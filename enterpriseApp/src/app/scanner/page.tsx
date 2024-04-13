'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

// Dynamically import qrcode-scanner-react
const Scanner = dynamic(() => import('qrcode-scanner-react'), { ssr: false })

export default function ScannerView() {
  const [scanning, setScanning] = useState(true)
  const [result, setResult] = useState('')

  function scanSuccess(result: string) {
    setScanning(false)
    setResult(result)
  }

  function startScan() {
    setResult('')
    setScanning(true)
  }

  return (
    <div>
      {scanning ? (
        <>
          <Scanner scanning={scanning} scanSuccess={scanSuccess} />
        </>
      ) : (
        <button onClick={startScan}>Start Scanning</button>
      )}
      <p>Result: {result}</p>
    </div>
  )
}
