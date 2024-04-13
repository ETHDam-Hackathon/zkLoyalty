'use client'
import { CardList } from '@/components/CardList'
import { EXAMPLE_ITEMS } from './examples/examples'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { Connect_s } from '@/components/Connect-semphore'
import { ShowGroups } from '@/components/showGroups'

export default function Home() {
  const [commitment, setCommitment] = useState<string>()
  useEffect(() => {
    const commitment = localStorage.getItem('commitment')
    if (!commitment) {
      return
    } else {
      setCommitment(commitment)
    }
  })
  return (
    <>
      <h2 className='text-2xl mb-2'>{'Profil'}</h2>
      <div className='mt-4'>{Connect_s()}</div>
      {commitment ? <div className='mt-4'>{ShowGroups()}</div> : <></>}
    </>
  )
}
