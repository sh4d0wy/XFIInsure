"use client"
import React from 'react'
import { Web3Provider } from './Web3Provider'

const WagmiProviderNew = ({children}:{children:React.ReactNode}) => {
  return (
    <Web3Provider>
        {children}
    </Web3Provider>
  )
}

export default WagmiProviderNew