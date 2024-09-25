"use client"
import React, { useEffect, useState } from 'react'
import { PoolInfoCard } from './PoolCards';
import { usePoolRead } from '../web3/hooks/usePoolRead';
import { useAccount, useWatchContractEvent, useWriteContract } from 'wagmi';
import { usePoolWrite } from '../web3/hooks/usePoolWrite';
import { poolPolygonAddress } from '../web3/Addresses';
import { InsurancePoolAbi } from '../web3/Abi';
import { parseEther } from 'viem';

const PoolContainers = () => {
    const [totalPoolSize, setTotalPoolSize] = useState<number>(0);
    const [userStaked, setUserStaked] = useState(0)
    const [userRewards, setUserRewards] = useState(250)
    const [depositAmount, setDepositAmount] = useState('')
    const [withdrawAmount, setWithdrawAmount] = useState('')

    const {address,isConnected} = useAccount();
    const {data:totalLiquidity,isLoading:LiquidityLoading} = usePoolRead({
      functionName:"totalLiquidity",
      args:[]
    })

    const {data:providerBalance} = usePoolRead({
      functionName: "getProviderBalance",
      args:[address]
    })
    
    const {write,isSuccess} = usePoolWrite();

    console.log(totalLiquidity);
    useEffect(()=>{
      setTotalPoolSize(Number(totalLiquidity)/10**18);
      setUserStaked(Number(providerBalance)/10**18);

    },[totalLiquidity,providerBalance,isSuccess])
   

    
  const handleDeposit = () => {
    write({
        functionName: "provideLiquidity",
        args: [],
        value:parseEther(depositAmount)
      });
  };


    useWatchContractEvent({
      address:poolPolygonAddress,
      abi:InsurancePoolAbi,
      eventName: "LiquidityProvided",
      onLogs:(logs)=>{
          console.log(logs[0])
      }
    })
    const handleWithdraw = (e:any) => {
      e.preventDefault()
      // Implement withdraw logic here
      console.log('Withdrawing:', withdrawAmount)
      write({
        functionName: "withdrawLiquidity",
        args: [parseEther(withdrawAmount)],
      });
    }
  
    const handleClaimRewards = () => {
      // Implement claim rewards logic here
      console.log('Claiming rewards')
    }
    console.log(depositAmount)
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
            <div className="bg-black bg-opacity-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Deposit Liquidity
              </h2>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Amount to deposit"
                className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
              />
              <button
                onClick={handleDeposit}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Deposit
              </button>
            </div>

            <form
              onSubmit={handleWithdraw}
              className="bg-black bg-opacity-50 rounded-lg p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                Withdraw Liquidity
              </h2>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Amount to withdraw"
                className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Withdraw
              </button>
            </form>
          </div>

          <div className="mt-12 bg-black bg-opacity-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Your Rewards
            </h2>
            <p className="text-3xl text-green-400 mb-4">
              ${userRewards.toLocaleString()}
            </p>
            <button
              onClick={handleClaimRewards}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300"
            >
              Claim Rewards
            </button>
          </div>
        </main>
      </div>
    );
}

export default PoolContainers