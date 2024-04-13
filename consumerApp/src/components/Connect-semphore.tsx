'use client'
import React, { useEffect, useState } from 'react'
import { Identity } from '@semaphore-protocol/identity'
import { useSignMessage, useAccount } from 'wagmi'

export function Connect_s() {
  const { signMessage, data: signature } = useSignMessage()
  const [commitment, setCommitment] = useState<string>()

  useEffect(() => {
    if (signature) {
      const { privateKey, publicKey, commitment } = new Identity(signature)
      localStorage.setItem('commitment', commitment.toString())
    }
    const commitment = localStorage.getItem('commitment')
    if (!commitment) {
      return
    } else {
      setCommitment(commitment)
    }
  })

  return (
    <>
      {commitment ? (
        <button className='btn btn-primary' onClick={() => signMessage({ message: 'I am a consumer for zkLoyalty.' })}>
          Connect Semaphore
        </button>
      ) : (
        <></>
      )}
    </>
  )
}
