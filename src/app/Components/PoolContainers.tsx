"use client"
import React, { useEffect, useState } from 'react'
import { PoolInfoCard } from './PoolCards';
import { usePoolRead } from '../web3/hooks/usePoolRead';
import { useAccount } from 'wagmi';

const PoolContainers = () => {
    const [totalPoolSize, setTotalPoolSize] = useState<number>(0);
    const [userStaked, setUserStaked] = useState(0)
    const [userRewards, setUserRewards] = useState(250)
    const [depositAmount, setDepositAmount] = useState('')
    const [withdrawAmount, setWithdrawAmount] = useState('')

    const {address} = useAccount();
    const {data:totalLiquidity,isLoading:LiquidityLoading} = usePoolRead({
      functionName:"totalLiquidity",
      args:[]
    })

    const {data:providerBalance} = usePoolRead({
      functionName: "getProviderBalance",
      args:[address]
    })
    console.log(totalLiquidity);
    useEffect(()=>{
      setTotalPoolSize(Number(totalLiquidity)/10**18);
      setUserStaked(Number(providerBalance)/10**18);

    },[totalLiquidity,providerBalance])
   

    const handleDeposit = (e:any) => {
      e.preventDefault()
      // Implement deposit logic here
      console.log('Depositing:', depositAmount)
    }
  
    const handleWithdraw = (e:any) => {
      e.preventDefault()
      // Implement withdraw logic here
      console.log('Withdrawing:', withdrawAmount)
    }
  
    const handleClaimRewards = () => {
      // Implement claim rewards logic here
      console.log('Claiming rewards')
    }
  
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-blue-900 to-blue-700 py-10 px-20">  
        <main className="container mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold text-white mb-8">Insurance Pool</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PoolInfoCard
              title="Total Insurance Pool"
              value={`${totalPoolSize.toLocaleString()} XFI`}
            />
            <PoolInfoCard
              title="Your Staked Amount"
              value={`${userStaked.toLocaleString()} XFI`}
            />
          </div>
  
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={handleDeposit} className="bg-black bg-opacity-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Deposit Liquidity</h2>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Amount to deposit"
                className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
              />
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                Deposit
              </button>
            </form>
  
            <form onSubmit={handleWithdraw} className="bg-black bg-opacity-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Withdraw Liquidity</h2>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Amount to withdraw"
                className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
              />
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                Withdraw
              </button>
            </form>
          </div>
  
          <div className="mt-12 bg-black bg-opacity-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rewards</h2>
            <p className="text-3xl text-green-400 mb-4">${userRewards.toLocaleString()}</p>
            <button onClick={handleClaimRewards} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300">
              Claim Rewards
            </button>
          </div>
        </main>
      </div>
    )
}

export default PoolContainers