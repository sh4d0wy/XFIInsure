"use client";

import { useEffect, useState } from "react";
import { useManagerRead } from "../web3/hooks/useManagerRead";
import { useAccount, useTransaction } from "wagmi";
import PolicyCard, { policyType } from "./PolicyCard";
import MyPolicyCard from "./MyPolicyCard";

export const MyPolicies = () => {
  
  const {address} = useAccount();

  const handleClaimPolicy = (policyId: number) => {
    // Implement policy claim logic here
    console.log("Claiming policy:", policyId);
    // You would typically open a modal or navigate to a claim form here
  };

  const {data:policyLength} = useManagerRead({
    functionName:"nextPolicyId"
  })
  const policyIds = Number(policyLength) ? Array.from({ length: Number(policyLength) }, (_, i) => i) : [];
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-blue-700 px-20">
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-white mb-8">My Policies</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policyIds.length > 0 ? (
        policyIds.map((policyId) => (
          <MyPolicyCard key={policyId} policyId={policyId} />
        ))
      ) : (
        <div>No policies Of User</div>
      )}
        </div>
      </main>
    </div>
  );
};
// function PolicyCard({ policy, onPayPremium, onClaimPolicy }: any) {
//   return (
//       <div className="bg-black bg-opacity-50 rounded-lg p-6 text-white">
//         <h2 className="text-2xl font-semibold mb-4">{policy.title}</h2>
//         <div className="space-y-2 mb-6">
//           <p><span className="text-blue-300">Coverage:</span> {Number(BigInt(policy.coverageAmount))/10**18}</p>
//           <p><span className="text-blue-300">Premium:</span> {Number(BigInt(policy.premium))/10**18}</p>
//           <p><span className="text-blue-300">Provider:</span> {policy.owner.slice(0,10)}...</p>
//           <p><span className="text-blue-300">Type:</span> {policy.coverageType}</p>
//           <p><span className="text-blue-300">Duration:</span> {new Date(Number(BigInt(policy.expirationDate))*1000  ).toLocaleString()}</p>
//         </div>
//         <div className="flex flex-col space-y-2">
//         {!policy.premiumPaid && (
//           <button
//             onClick={() => onPayPremium(policy.id)}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
//           >
//             Pay Premium
//           </button>
//         )}
//         <button
//           onClick={() => onClaimPolicy(policy.id)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
//         >
//           Claim Policy
//         </button>
//       </div>
//       </div>
//     // <div className="bg-black bg-opacity-50 rounded-lg p-6 text-white">
//     //   <h2 className="text-2xl font-semibold mb-4">{policy.title}</h2>
//     //   <div className="space-y-2 mb-6">
//     //     <p>
//     //       <span className="text-blue-300">Coverage:</span> {Number(BigInt(policy.coverageAmount))/(10**18)}
//     //     </p>
//     //     <p>
//     //       <span className="text-blue-300">Premium:</span> {policy.premium}
//     //     </p>
//     //     <p>
//     //       <span className="text-blue-300">Status:</span> {policy.isActive}
//     //     </p>

//     //   </div>
     
//     // </div>
//   );
// }
