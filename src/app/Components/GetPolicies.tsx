"use client"
import React, { useState } from 'react'
import PolicyCard, { policyType } from './PolicyCard'
import { useManagerRead } from '../web3/hooks/useManagerRead'
import { usePathname } from 'next/navigation'

const GetPolicies = () => {
  // const [policies,setPolicies] = useState([]);  
  const {data} = useManagerRead({
    functionName:"getAllPolicies",
    args:[]
  })

  const policies = Array.isArray(data)?data : [];
  const router = usePathname();
  console.log(router);
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.length > 0? policies.map((policyItem:any,index) => (
            <>
            <PolicyCard key={index} policy={policyItem}/>
            </>
          )):<div>No more policies</div>}
    </div>
  )
}

export default GetPolicies