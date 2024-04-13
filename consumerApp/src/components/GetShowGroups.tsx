'use-client'
import React, { useEffect, useState } from 'react'
import { GroupCard, GroupCardType } from './groupCard'
import { fetchGroups } from '@/smartCom/formatGroups'

export type GroupCardTypeRaw = {
  groupNumber: string
  points: number
}

export function ShowGroups() {
  const getGroups = (): GroupCardType[] => {
    const dataRAW = localStorage.getItem('groups')
    if (dataRAW) {
      return JSON.parse(dataRAW)
    } else {
      return []
    }
  }

  return (
    <>
      <div className='mt-4'>
        {getGroups().map((entry, index) => (
          <div key={index}>{GroupCard(entry)}</div>
        ))}
      </div>
    </>
  )
}
