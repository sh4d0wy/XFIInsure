"use client"
import React, { useState } from 'react'
import PolicyCard, { policyType } from './PolicyCard'
import { useManagerRead } from '../web3/hooks/useManagerRead'
import { usePathname } from 'next/navigation'

const GetPolicies = () => {
  // const [policies,setPolicies] = useState([]);
 
    const {data:policyLength} = useManagerRead({
      functionName:'nextPolicyId',
    }) as {data:BigInt}
    const policyIds = Number(policyLength) ? Array.from({ length: Number(policyLength) }, (_, i) => i) : [];

    return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {policyIds.length > 0 ? (
        policyIds.map((policyId) => (
          <PolicyCard key={policyId} policyId={policyId} />
        ))
      ) : (
        <div>No policies found</div>
      )}
    </div>
  )
}

export default GetPolicies