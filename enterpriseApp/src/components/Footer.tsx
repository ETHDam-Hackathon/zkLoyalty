import React from 'react'
import { NetworkStatus } from './NetworkStatus'
import Link from 'next/link'


export function Footer() {
  return (
    <>
      <div className='place-self-end'>
        <NetworkStatus />
      </div>

      <footer className='sticky top-[100vh] footer flex justify-between items-center bg-neutral text-neutral-content p-4'>
        <Link className='button' href='/scanner'>
          QR Code Scanner
        </Link>
        <Link className='button' href='/'>
          Settings
        </Link>
      </footer>
    </>
  )
}
