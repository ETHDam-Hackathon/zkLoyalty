'use client'
import { useSignMessage } from 'wagmi'
import { Identity } from '@semaphore-protocol/identity'
import { useEffect, useState } from 'react'

export default function Manage() {
  const { signMessage, data: signature } = useSignMessage()
  const [commitment, setCommitment] = useState<bigint>()
  const comm = localStorage.getItem('commitment')

  function createIdentity() {
    if (comm !== null) {
      setCommitment(BigInt(comm))
    } else {
      const identity = new Identity(signature)
      setCommitment(identity.commitment)
      localStorage.setItem('commitment', identity.commitment.toString())
    }
  }

  useEffect(() => {
    if (comm !== null) {
      setCommitment(BigInt(comm))
    }
  }, [comm])

  useEffect(() => {
    if (signature) {
      createIdentity()
    }
  }, [signature])

  return (
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
  )
}
