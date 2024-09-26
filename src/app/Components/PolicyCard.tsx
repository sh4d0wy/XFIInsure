import { parseEther } from "viem";
import { useManagerWrite } from "../web3/hooks/useManagerWrite";
import toast, { ToastBar } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAccount, useWatchContractEvent } from "wagmi";
import { managerPolygonAddress } from "../web3/Addresses";
import { PolicyMaangerAbi } from "../web3/Abi";
import { useManagerRead } from "../web3/hooks/useManagerRead";

// components/PolicyCard.js
export type policyType={
  id:number,
  owner:string,
  title:string,
  coverageAmount:number,
  premium:number,
  expirationDate:number,
  isActive:boolean,
  coverageType:string
}
export default function PolicyCard({policy,onPayPremium,onClaimPolicy}:{policy:policyType,onPayPremium?:(policyId:number)=>void ,onClaimPolicy?:(policyId:number)=>void}) {
  const {address} = useAccount();
  const {write,isSuccess} = useManagerWrite();
  const [userPolicy,setPolicy] = useState<null|policyType[]>(null);
  const [flag,setFlag] = useState(false);
  const handlePurchasePolicy = (policyId:number,premium:number)=>{
    write({
      functionName:"purchasePolicy",
      args:[policyId],
      value:BigInt(String(premium))
    })
  }


  const {data } = useManagerRead({
    functionName:"getAllPoliciesForUser",
    args:[address]
  })

  useEffect(()=>{
   if(Array.isArray(data)?data:[]){
    setPolicy(data as []);
   }

   userPolicy?.map((userpolicy)=>{
      if(userpolicy.id==policy.id){
        setFlag(true);
      }
   })
  },[data,flag,policy,userPolicy])

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

    return (
      <div className="bg-black bg-opacity-50 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">{policy.title}</h2>
        <div className="space-y-2 mb-6">
          <p className="flex justify-between"><span className="text-blue-300">PolicyID:</span> {Number(BigInt(policy.id))}</p>
          <p className="flex justify-between"><span className="text-blue-300">Coverage:</span> {Number(BigInt(policy.coverageAmount))/10**18}</p>
          <p className="flex justify-between"><span className="text-blue-300">Premium:</span> {(Number(BigInt(policy.premium))/10**18).toFixed(5)} XFI</p>
          <p className="flex justify-between"><span className="text-blue-300">Provider:</span> {policy.owner.slice(0,10)}...</p>
          <p className="flex justify-between"><span className="text-blue-300">Type:</span> {policy.coverageType}</p>
          <p className="flex justify-between"><span className="text-blue-300">Expiration Date:</span> {new Date(Number(BigInt(policy.expirationDate))*1000  ).toLocaleDateString()}</p>
        </div>
        {!flag?
        <div className="flex justify-center gap-20">
        <button onClick={()=>toast.success("Details listed")}>
          View Details
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300" onClick={()=>handlePurchasePolicy(1,policy.premium)}>
          Subscribe
        </button>
      </div>:
      <div className="flex justify-center gap-20">
        <button onClick={()=>toast.success("Details listed")}>
          View Details
        </button>
        <button className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300" disabled>
          Purchased
        </button>
      </div>
      }
        
      </div>
    )
  }