'use client'
import { useSignMessage } from 'wagmi'
import { Identity } from '@semaphore-protocol/identity'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function Home() {
  const { signMessage, data: signature } = useSignMessage()
  const [commitment, setCommitment] = useState<bigint>()

  const { isConnected } = useAccount()

  function createIdentity() {
    const identity = new Identity(signature)
    setCommitment(identity.commitment)
    localStorage.setItem('commitment', identity.commitment.toString())
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage?.getItem('commitment') !== null) {
        setCommitment(BigInt(localStorage?.getItem('commitment') as string | ''))
      }
    }
  }, [])

  useEffect(() => {
    if (signature) {
      createIdentity()
    }
  }, [signature])

  return (
    <>
      {isConnected ? (
        <>
          <h2 className='text-2xl mb-2'>Settings</h2>
          <div className='mt-4'>
            <h3 className='text-lg mb-1'>Create Semaphore Enterprise Identity</h3>
            {!commitment && (
              <button
                className='btn btn-primary'
                onClick={() => signMessage({ message: 'I am an enterprise user for zkLoyalty.' })}>
                Create Identity
              </button>
            )}
            {commitment && (
              <p>
                Identity created with commitment:{' '}
                <code>{commitment.toString().slice(0, 3) + '...' + commitment.toString().slice(-3)}</code>
              </p>
            )}
            <h3 className='text-lg mb-1 mt-6'>Create Group</h3>
            <button className='btn btn-primary'>Create Group</button>
          </div>
        </>
      ) : (
        <h2 className='text-2xl mb-2'>Connect to a wallet</h2>
      )}
    </>
  )
}
