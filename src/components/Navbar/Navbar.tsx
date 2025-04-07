import Link from 'next/link'
import React from 'react'

type NavbarProps = {}

const NavbarPage: React.FC<NavbarProps> = () => {
    return <div className="flex items-center justify-between sm:px-12 px-2 ml:px-24">
        <Link href="/" className='flex items-center justify-center h-20'>
        </Link>
    </div>
  }

export default NavbarPage