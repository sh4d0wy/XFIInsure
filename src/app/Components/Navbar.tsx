"use client"
import Link from 'next/link'
import { ConnectButton } from 'thirdweb/react'
import { client } from '../client'
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const owner = "0x09D9a6EdfE066fc24F46bA8C2b21736468f2967D"
  const {address} = useAccount();
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
            {address == owner ?
            <>
            <NavLink href="/createPolicy">Create Policy</NavLink>
            <NavLink href="/verifypolicy">Verify Claims</NavLink>
            </>:
            <>
            <NavLink href="/claimpolicy">Claim Policy</NavLink>
            </>
          }
            <NavLink href="/mypolicies">My Policies</NavLink>
          </div>
         <ConnectKitButton/>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }:{href:string,children:string}) {
  const pathName = usePathname();
    return (
      <Link href={href} className={` hover:text-white transition duration-300 ${pathName===href?"font-bold text-white":"text-gray-300"}`}>
       {children}
      </Link>
    )
  }