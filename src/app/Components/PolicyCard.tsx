import { parseEther } from "viem";
import { useManagerWrite } from "../web3/hooks/useManagerWrite";
import toast, { ToastBar } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAccount, useWatchContractEvent } from "wagmi";
import { managerPolygonAddress } from "../web3/Addresses";
import { PolicyMaangerAbi } from "../web3/Abi";
import { useManagerRead } from "../web3/hooks/useManagerRead";
import Link from "next/link";
import { useRouter } from "next/navigation";

// components/PolicyCard.js
export type policyType={
  id:number,
  owner:string,
  title:string,
  coverageAmount:number,
  premium:number,
  expirationDate:number,
  isActive:boolean,
  coverageType:string,
  nextPremiumDate:number,
  description?:string
}
export default function PolicyCard({policyId}:{policyId:number}) {
  const {address} = useAccount();
  const {write,isSuccess} = useManagerWrite();
  const [policy,setPolicy] = useState<any[]|null>(null);
  const [flag,setFlag] = useState(false);
  const handlePurchasePolicy = (policyId:number,premium:number)=>{
    write({
      functionName:"purchasePolicy",
      args:[policyId],
      value:BigInt(String(premium))
    })
  }

  const {data } = useManagerRead({
    functionName:"policies",
    args:[policyId]
  }) as {data:any}

  const {data:addressToPolicy} = useManagerRead({
    functionName:"addressToPolicy",
    args:[address,policyId]
  })

  useEffect(()=>{
   if(Array.isArray(data)){
    setPolicy(data);
   }
   console.log(addressToPolicy);
   if(addressToPolicy!=undefined){
    setFlag(true);
   }

  },[data,flag,policy,addressToPolicy])

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

  // (10) [0n, '0x09D9a6EdfE066fc24F46bA8C2b21736468f2967D', 'Policy1', 'A new policy for defi hacks', 100000000000000000n, 2401278602232369n, 1765497600n, true, 'defi_risk', 1743877439n]0: 0n1: "0x09D9a6EdfE066fc24F46bA8C2b21736468f2967D"2: "Policy1"3: "A new policy for defi hacks"4: 100000000000000000n5: 2401278602232369n6: 1765497600n7: true8: "defi_risk"9: 1743877439nlength: 10[[Prototype]]: Array(0)


    if(policy){

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
        {!flag?
        <div className="flex justify-center gap-20">
          <Link href={`/viewdetail/${policy[0]}`}>
        <button className="bg-blue-500 px-4 py-2 rounded-lg text-white" >
          View Details
        </button>
        </Link>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300" onClick={()=>handlePurchasePolicy(policy[0],policy[5])}>
          Subscribe
        </button>
      </div>:
      <div className="flex justify-center gap-20">
        <Link href={`/viewdetail/${policy[0]}`}>
        <button className="bg-blue-500 px-4 py-2 rounded-lg text-white"   >
          View Details
        </button>
        </Link>
        <button className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300" disabled>
          Purchased
        </button>
      </div>
      }
        
      </div>
  )
}
  }