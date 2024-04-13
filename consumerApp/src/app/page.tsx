'use client'
import { CardList } from '@/components/CardList'
import { EXAMPLE_ITEMS } from './examples/examples'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { Connect_s } from '@/components/Connect-semphore'
import { ShowGroups } from '@/components/GetShowGroups'
import { unwatch } from '@/smartCom/getGroups'
import { fetchGroups } from '@/smartCom/formatGroups'

export default function Home() {
  const [commitment, setCommitment] = useState<string>()
  const [iswatching, setIswatching] = useState<boolean>(false)
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
    </>
  )
}
