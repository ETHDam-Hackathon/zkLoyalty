'use client'
import { CardList } from '@/components/CardList'
import { EXAMPLE_ITEMS } from '../examples/examples'
import React from 'react'
import { useAccount } from 'wagmi'
import { Connect_s } from '@/components/Connect-semphore'

export default function Home() {
  const account = useAccount()
  const test = () => {
    console.log(account)
  }

  return (
    <>
      <h2 className='text-2xl mb-2'>{'Profil'}</h2>
      <div className='mt-4'>{Connect_s()}</div>
    </>
  )
}
