"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ExternalLink, CheckCircle, Info } from 'lucide-react';
import { useManagerRead } from '../web3/hooks/useManagerRead';
import { useManagerWrite } from '../web3/hooks/useManagerWrite';

type claim={
  claimId:number;
  policyId:number;
  isVerified:boolean;
  isPaid:boolean;
  buyerAddress:string;
  documentIPFSHash:string;
  description:string;
}
export default function VerifyClaims() {
  const {data} = useManagerRead({
    functionName:"getAllUnverifiedClaims"
  })
  const {write } = useManagerWrite();
  const addressZero = "0x0000000000000000000000000000000000000000"
  const [claims, setClaims] = useState<null|claim[]>(null);
  const [verifiedClaimId, setVerifiedClaimId] = useState<null|String>(null);

  const handleVerify = (claimId:string) => {
    console.log('Verifying claim:', claimId);
    write({
      functionName:"verifyClaim",
      args:[BigInt(claimId)]
    })
  };

  useEffect(()=>{
    if(Array.isArray(data)){
      setClaims(data);
    }
  },[data])
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-blue-700">
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Verify Claims</h1>
          <p className="text-blue-200 mb-8">Review and verify insurance claims</p>
          
          {verifiedClaimId && (
            <div className="mb-8 bg-green-500 bg-opacity-20 backdrop-blur-md border border-green-500 text-green-100 px-6 py-4 rounded-lg" role="alert">
              <strong className="font-bold">Claim Verified Successfully!</strong>
              <p className="inline"> Claim {verifiedClaimId} has been verified and processed.</p>
            </div>
          )}

          <div className="space-y-6">
            {claims?claims.map((claim) => {
              console.log(claim.documentIPFSHash);
              if(claim.claimId==0){
                return(
                  <></>
                )
              }
              return(
              <div key={claim.claimId} className="bg-black bg-opacity-30 backdrop-blur-md rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-opacity-20">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-white">Claim ID: {String(claim.claimId)}</h2>
                    <span className="text-blue-300">{claim.buyerAddress}</span>
                  </div>
                  <div className="mb-4 flex items-start">
                    <Info className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">{claim.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => window.open(claim.documentIPFSHash, '_blank')}
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      View Documents
                    </button>
                    {claim.isVerified ?
                    <>
                    <button
                      className="flex items-center bg-green-700 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Verified
                    </button>
                    </>:
                    <button
                    onClick={() => handleVerify(String(claim.claimId))}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Verify Claim
                    </button> }
                  </div>
                </div>
              </div>
            )}):<></>}
          </div>
          {claims?claims.length === 0 && (
            <p className="text-center text-blue-300 mt-4">No pending claims to verify.</p>
          ):<></>}
        </div>
      </main>
    </div>
  );
}