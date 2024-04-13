'use client'
import { useEffect, useState } from 'react'
import { raffle } from '@/abis'

import { Connect_s } from '@/components/Connect-semphore'
import { ShowGroups } from '@/components/GetShowGroups'
import { unwatch } from '@/smartCom/getGroups'
import { fetchGroups } from '@/smartCom/formatGroups'
import { usePublicClient, useAccount, useReadContract } from 'wagmi'

export default function Home() {
  const [commitment, setCommitment] = useState<string>()
  const [iswatching, setIswatching] = useState<boolean>(false)
  const [raffleNumber, setRaffleNumber] = useState<number>()

  const client = usePublicClient()

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

  return (
    <>
      <h2 className='text-2xl mb-2'>{'Profil'}</h2>
      <div className='mt-4'>{Connect_s()}</div>
      {commitment ? <div className='mt-4'>{ShowGroups()}</div> : <></>}

      <h2 className='text-2xl mb-2'>{'Raffle'}</h2>
      <button className='btn btn-primary' onClick={() => raffleFn()}>
        {'Generate Raffle Number'}
      </button>
      <p>{raffleNumber}</p>
    </>
  )
}
