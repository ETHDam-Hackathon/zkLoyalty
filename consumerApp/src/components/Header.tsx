import React from 'react'
import { LinkComponent } from './LinkComponent'
import { Connect } from './Connect'
import Image from 'next/image'

export function Header() {
  return (
    <header className='navbar flex justify-between p-4 pt-0'>
      <LinkComponent href='/'>
        <Image src='/logo.png' alt='Logo' width={190} height={40} />
      </LinkComponent>

      <Connect />
    </header>
  )
}
