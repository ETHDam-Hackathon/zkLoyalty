'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { usePublicClient, useSignMessage, useWalletClient, useWatchContractEvent, useWriteContract } from 'wagmi'
import { semaAbi } from '@/abis'

// Dynamically import qrcode-scanner-react
const Scanner = dynamic(() => import('qrcode-scanner-react'), { ssr: false })

export default function ScannerView() {
  const { writeContract } = useWriteContract()

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
      <br />
      <p>bigint: {BigInt(result.toString())}</p>
      <br />
      <p>id: {localStorage.getItem('groupId')}</p>

      <button
        className='btn btn-primary'
        onClick={() =>
          writeContract({
            abi: semaAbi,
            address: '0xD85CD1D0B5A892973c9DEB7522CE691638157DDE',
            functionName: 'addMember',
            args: [result, localStorage.getItem('groupId')],
            chainId: 11155111,
          })
        }>
        Add User
      </button>

      <button
        className='btn btn-primary'
        onClick={() =>
          writeContract({
            abi: semaAbi,
            address: '0xD85CD1D0B5A892973c9DEB7522CE691638157DDE',
            functionName: 'proveMembership',
            args: [result, localStorage.getItem('groupId')],
            chainId: 11155111,
          })
        }>
        Add User
      </button>
    </div>
  )
}
