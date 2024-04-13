'use client'
import React, { useEffect } from 'react'
import { Identity } from '@semaphore-protocol/identity'
import { useSignMessage, useAccount } from 'wagmi'

export function Connect_s() {
  const { signMessage, data: signature } = useSignMessage()

  useEffect(() => {
    if (signature) {
      const { privateKey, publicKey, commitment } = new Identity(signature)
      console.log(privateKey, publicKey, commitment)
    }
  })

  return (
    <>
      <button onClick={() => signMessage({ message: 'ckLoyalty' })}>Connect Semaphore</button>
    </>
  )
}
