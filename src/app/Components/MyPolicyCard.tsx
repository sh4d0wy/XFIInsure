import { parseEther } from "viem";
import { useManagerWrite } from "../web3/hooks/useManagerWrite";
import toast, { ToastBar } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAccount, useWatchContractEvent } from "wagmi";
import { managerPolygonAddress } from "../web3/Addresses";
import { PolicyMaangerAbi } from "../web3/Abi";
import { useManagerRead } from "../web3/hooks/useManagerRead";
import { policyType } from "./PolicyCard";
import Link from "next/link";

export default function MyPolicyCard({policyId}:{policyId:number}) {
  const {address} = useAccount();
  const {write,isSuccess} = useManagerWrite();
  const [policy,setPolicy] = useState<null|any[]>(null);
  const [flag,setFlag] = useState(false);
  
  const {data:policyFetched } = useManagerRead({
    functionName:"policies",
    args:[policyId]
  }) as {data:any}

  const {data:addressToPolicy} = useManagerRead({
    functionName:"addressToPolicy",
    args:[address,policyId]
  })

  const {write:payPremium } = useManagerWrite()

  const handlePremiumPay = ({policyId,premium}:{policyId:number,premium:string})=>{
    payPremium({
      functionName:"payPremium",
      args:[policyId],
      value:BigInt(premium)
    })
  }
  // const {data } = useManagerRead({
  //   functionName:"getAllPoliciesForUser",
  //   args:[address]
  // })

  useEffect(()=>{
   if(policyFetched && addressToPolicy===policyFetched[0]){
    setPolicy(policyFetched)
   }
    },[flag,policyFetched,addressToPolicy])

  useWatchContractEvent({
    address:managerPolygonAddress,
    abi:PolicyMaangerAbi,
    eventName:"PolicyPurchased",
    onLogs:(logs)=>{
      toast.success("Policy Purchased successfully",{
        duration:4000
      })
    }
  })
  
  useWatchContractEvent({
    address:managerPolygonAddress,
    abi:PolicyMaangerAbi,
    eventName:"PremiumPaid",
    onLogs:(logs)=>{
      toast.success("Premium Paid",{
        duration:4000
      })
    }
  })
    if(policy)
    return (
      <div className="bg-black bg-opacity-50 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">{policy[2]}</h2>
        <div className="space-y-2 mb-6">
          <p className="flex justify-between"><span className="text-blue-300">PolicyID:</span> {Number(BigInt(policy[0]))}</p>
          <p className="flex justify-between"><span className="text-blue-300">Coverage:</span> {Number(BigInt(policy[4]))/10**18} XFI</p>
          <p className="flex justify-between"><span className="text-blue-300">Premium:</span> {(Number(BigInt(policy[5]))/10**18).toFixed(5)} XFI</p>
          <p className="flex justify-between"><span className="text-blue-300">Creator:</span> {policy[1].slice(0,10)}...</p>
          <p className="flex justify-between"><span className="text-blue-300">Type:</span> {policy[8]}</p>
          <p className="flex justify-between"><span className="text-blue-300">Expiration Date:</span> {new Date(Number(BigInt(policy[6]))*1000  ).toLocaleDateString()}</p>
        </div>

        <div className="flex justify-center gap-20">
        <Link href={`/viewdetail/${policy[0]}`}>
        <button className="bg-blue-400 text-white rounded-lg px-4 py-2">
          View Details
        </button>
        </Link>

        <button className="bg-green-500 text-white rounded-lg px-4 py-2" onClick={()=>handlePremiumPay({policyId:policy[0],premium:String(policy[5])})}>
          Pay Premium
        </button>
      </div>
      
        
      </div>
    )
  }