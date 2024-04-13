'use client'
import React, { useEffect, useState } from 'react'
import { useQRCode } from 'next-qrcode'

export default function Qr() {
  const { Canvas } = useQRCode()
  const [commitment, setCommitment] = useState<string>()
  console.log(commitment)
  useEffect(() => {
    const commitment = localStorage.getItem('commitment')
    if (!commitment) {
      return
    } else {
      setCommitment(commitment)
    }
  })
  return (
    <div className='w-1/2 mx-auto text-center'>
      {commitment ? (
        <Canvas
          text={commitment}
          options={{
            errorCorrectionLevel: 'L',
            margin: 2,
            scale: 4,
            width: 200,
            color: {
              dark: '#00000000',
              light: '#ffffffff',
            },
          }}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
