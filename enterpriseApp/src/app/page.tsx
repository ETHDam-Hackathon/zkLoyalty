'use client'
import { usePublicClient, useSignMessage, useWalletClient, useWatchContractEvent, useWriteContract } from 'wagmi'
import { Identity } from '@semaphore-protocol/identity'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { zamaABI, semaAbi } from '@/abis'
import { watchContractEvent } from '@wagmi/core'

export default function Home() {
  const { signMessage, data: signature } = useSignMessage()
  const [commitment, setCommitment] = useState<bigint>()

  const { writeContract } = useWriteContract()

  const [userAddress, setUserAddress] = useState('')
  const handleInputChange = (event: any) => {
    setUserAddress(event.target.value)
  }

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

  const [groupCreated, setGroupCreated] = useState<any>()

  useEffect(() => {
    if (signature) {
      createIdentity()
    }
  }, [signature])

  useWatchContractEvent({
    address: '0x5f588FF374D788470af75A55253FD6488Ea9c90e',
    abi: semaAbi,
    eventName: 'GroupCreated',
    onLogs(logs: any) {
      console.log('New logs!', logs)
      setGroupCreated(logs[0].args.groupId.toString())
      localStorage.setItem('groupId', logs[0].args.groupId.toString())
    },
    poll: true,
    pollingInterval: 10_000,
  })

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

            <button
              className='btn btn-primary'
              onClick={() =>
                writeContract({
                  abi: semaAbi,
                  address: '0x5f588FF374D788470af75A55253FD6488Ea9c90e',
                  functionName: 'createGroup',
                  chainId: 11155111,
                })
              }>
              Create Group
            </button>
            {groupCreated && <p>Group Created with ID: {groupCreated}</p>}

            <h3 className='text-lg mb-1 mt-6'>Reward User</h3>
            <input value={userAddress} onChange={handleInputChange} placeholder='Enter user address' />
            <button
              className='btn btn-primary'
              onClick={() =>
                writeContract({
                  abi: zamaABI,
                  address: '0x7e9D541EbcfF638fE973928Bf03Dc75A428903fb',
                  functionName: 'rewardPoints',
                  args: [userAddress, 'hi'],
                })
              }>
              Reward User
            </button>
          </div>
        </>
      ) : (
        <h2 className='text-2xl mb-2'>Connect to a wallet</h2>
      )}
    </>
  )
}
