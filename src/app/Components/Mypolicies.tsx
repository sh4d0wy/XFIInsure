"use client";

import { useState } from "react";

export const MyPolicies = () => {
  const [policies, setPolicies] = useState([
    {
      id: 1,
      name: "DeFi Protocol Coverage",
      coverage: "$100,000",
      premium: "$500",
      nextPayment: "2024-05-01",
      status: "Active",
      premiumPaid: true,
    },
    {
      id: 2,
      name: "NFT Theft Protection",
      coverage: "$50,000",
      premium: "$250",
      nextPayment: "2024-04-15",
      status: "Active",
      premiumPaid: false,
    },
    {
      id: 3,
      name: "Smart Contract Vulnerability Insurance",
      coverage: "$200,000",
      premium: "$1,000",
      nextPayment: "2024-06-01",
      status: "Active",
      premiumPaid: true,
    },
  ]);

  const handlePayPremium = (policyId: number) => {
    // Implement premium payment logic here
    console.log("Paying premium for policy:", policyId);
    // Update the policy status after successful payment
    setPolicies(
      policies.map((policy) =>
        policy.id === policyId ? { ...policy, premiumPaid: true } : policy
      )
    );
  };

  const handleClaimPolicy = (policyId: number) => {
    // Implement policy claim logic here
    console.log("Claiming policy:", policyId);
    // You would typically open a modal or navigate to a claim form here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-blue-700 px-20">
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-white mb-8">My Policies</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <PolicyCard
              key={policy.id}
              policy={policy}
              onPayPremium={handlePayPremium}
              onClaimPolicy={handleClaimPolicy}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
function PolicyCard({ policy, onPayPremium, onClaimPolicy }: any) {
  return (
    <div className="bg-black bg-opacity-50 rounded-lg p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">{policy.name}</h2>
      <div className="space-y-2 mb-6">
        <p>
          <span className="text-blue-300">Coverage:</span> {policy.coverage}
        </p>
        <p>
          <span className="text-blue-300">Premium:</span> {policy.premium}
        </p>
        <p>
          <span className="text-blue-300">Next Payment:</span>{" "}
          {policy.nextPayment}
        </p>
        <p>
          <span className="text-blue-300">Status:</span> {policy.status}
        </p>
        <p>
          <span className="text-blue-300">Premium Paid:</span>{" "}
          {policy.premiumPaid ? "Yes" : "No"}
        </p>
      </div>
      <div className="flex flex-col space-y-2">
        {!policy.premiumPaid && (
          <button
            onClick={() => onPayPremium(policy.id)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Pay Premium
          </button>
        )}
        <button
          onClick={() => onClaimPolicy(policy.id)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Claim Policy
        </button>
      </div>
    </div>
  );
}
