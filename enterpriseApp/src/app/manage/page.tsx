'use client'
import { useSignMessage } from 'wagmi'
import { Identity } from '@semaphore-protocol/identity'
import { useEffect } from 'react'

export default function Manage() {
  const { signMessage, data: signature } = useSignMessage()

  function createIdentity() {
    const identity = new Identity(signature)
    console.log(identity)
  }

  useEffect(() => {
    if (signature) {
      createIdentity()
    }
  }, [signature])

  return (
    <>
      <h2 className='text-2xl mb-2'>Settings</h2>

      {/* Examples are only used for demo purposes. Feel free to delete this section */}
      <div className='mt-4'>
        <h3 className='text-lg mb-1'>Create Semaphore Enterprise Identity</h3>
        <button onClick={() => signMessage({ message: 'I am an enterprise user for zkLoyalty.' })}>Sign message</button>
        ƒ<h3 className='text-lg mb-1 mt-6'>Create Group</h3>
        <button className='btn btn-primary'>Create Group</button>
      </div>
    </>
  )
}
