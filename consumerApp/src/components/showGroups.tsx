'use client'
import React, { useEffect, useState } from 'react'
import { GroupCard, GroupCardType } from './groupCard'

export function ShowGroups() {
  const fetchGroups = () => {
    const fetchedGroups: GroupCardType[] = [
      { name: 'Thistle & Thorn Boutique', points: 120 },
      { name: 'Brew & Bean Corner', points: 23 },
      { name: 'The Nook Bookery', points: 13 },
      { name: 'Sage & Savory Pantry', points: 56 },
      { name: 'Cobblestone & Canvas', points: 78 },
    ]
    return fetchedGroups.sort((a, b) => b.points - a.points)
  }

  return (
    <>
      <div className='mt-4'>
        {fetchGroups().map((entry, index) => (
          <div key={index}>{GroupCard(entry)}</div>
        ))}
      </div>
    </>
  )
}
