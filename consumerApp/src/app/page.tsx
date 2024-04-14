'use client'
import { useEffect, useState } from 'react'
import { raffle } from '@/abis'

import { Connect_s } from '@/components/Connect-semphore'
import { ShowGroups } from '@/components/GetShowGroups'
import { unwatch } from '@/smartCom/getGroups'
import { fetchGroups } from '@/smartCom/formatGroups'
import { usePublicClient, useAccount, useReadContract, useWriteContract } from 'wagmi'
import { semaAbi } from '@/abis'
import { generateProof } from '@semaphore-protocol/proof'
import { Identity } from '@semaphore-protocol/identity'
import { useSignMessage } from 'wagmi'
import { SemaphoreSubgraph } from '@semaphore-protocol/data'
import { Group } from '@semaphore-protocol/group'
import { zamaABI } from '@/abis'

const semaphoreSubgraph = new SemaphoreSubgraph('sepolia')

const { members } = semaphoreSubgraph.getGroup('27', { members: true })

const group = new Group(members)
const scope = group.root // root of the group
const message = 1 // message to prove

export default function Home() {
  const [commitment, setCommitment] = useState<string>()
  const [iswatching, setIswatching] = useState<boolean>(false)
  const [raffleNumber, setRaffleNumber] = useState<number>()

  const client = usePublicClient()

  const { writeContract } = useWriteContract()

  async function raffleFn() {
    const data = await client.readContract({
      address: '0x6078a4b666CeB644fCf9e7424D4662Aa4Bf104d6',
      abi: raffle,
      functionName: 'generateRaffleNumber',
      chainId: 23295,
    })
    console.log(data)
    setRaffleNumber(data)
  }

  useEffect(() => {
    fetchGroups()
    const commitment = localStorage.getItem('commitment')
    if (!commitment) {
      return
    } else {
      setCommitment(commitment)
    }
    if (!iswatching) {
      unwatch()
      setIswatching(true)
    }
  })

  const [text, setText] = useState('')

  // const scope = group.root
  // const message = 1

  const [identity, setIdentity] = useState<Identity>()

  const { signMessage, data: signature } = useSignMessage()

  const { data, status, error } = useReadContract({
    abi: zamaABI,
    address: '0x7e9D541EbcfF638fE973928Bf03Dc75A428903fb',
    functionName: 'checkPoints',
  })

  console.log('result: ', data, status, error)

  useEffect(() => {
    if (signature) {
      const { privateKey, publicKey, commitment } = new Identity(signature)
      const identity = new Identity(signature)
      localStorage.setItem('commitment', commitment.toString())
      setIdentity(identity)

      console.log('identity: ', identity)
      console.log('message: ', message)
      console.log('scope: ', scope)
      console.log('group: ', group)

      generateProof(identity, group, message, scope)
        .then((proof) => {
          console.log('proof: ', proof)
          setProof(proof)
        })
        .catch((err) => {
          console.error('blaa: ', err)
        })
    }
    const commitment = localStorage.getItem('commitment')
    if (!commitment) {
      return
    } else {
      setCommitment(commitment)
    }
  })

  const [proof, setProof] = useState<any>()

  return (
    <>
      <h2 className='text-2xl mb-2'>{'Profil'}</h2>
      <div className='mt-4'>
        {' '}
        <>
          {!commitment ? (
            <button
              className='btn btn-primary'
              onClick={() => signMessage({ message: 'I am a consumer for zkLoyalty.' })}>
              Connect Semaphore
            </button>
          ) : (
            <>
              <button className='btn btn-primary' disabled={commitment ? true : false}>
                Connected
              </button>
            </>
          )}
        </>
      </div>
      {commitment ? <div className='mt-4'>{ShowGroups()}</div> : <></>}

      <h2 className='text-2xl mb-2'>{'Raffle'}</h2>
      <button className='btn btn-primary' onClick={() => raffleFn()}>
        {'Generate Raffle Number'}
      </button>
      <p>{raffleNumber}</p>

      <h2 className='text-2xl mb-2'>{'Prove Membership'}</h2>
      <button
        className='btn btn-primary'
        onClick={() =>
          writeContract({
            abi: semaAbi,
            address: '0xD85CD1D0B5A892973c9DEB7522CE691638157DDE',
            functionName: 'validateProof',
            args: [proof, 28],
          })
        }>
        Prove Membership
      </button>
      <p>{text}</p>
    </>
  )
}
