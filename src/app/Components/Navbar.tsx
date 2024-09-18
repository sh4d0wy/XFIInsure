"use client"
import Link from 'next/link'
import { ConnectButton } from 'thirdweb/react'
import { client } from '../client'
import { ConnectKitButton } from 'connectkit'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-b-lg w-4/5 mx-auto  px-10">
          <div className="flex items-center">
            <Link href="/" className='text-white font-bold text-xl'>
              XFIInsure
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/pools">Pools</NavLink>
            <NavLink href="/mypolicies">My Policies</NavLink>
          </div>
         <ConnectKitButton/>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }:{href:string,children:string}) {
    return (
      <Link href={href} className='text-gray-300 hover:text-white transition duration-300'>
       {children}
      </Link>
    )
  }