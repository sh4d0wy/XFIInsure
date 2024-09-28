"use client"
import React from 'react';
import Head from 'next/head';
import { Shield, DollarSign, Calendar, User, FileText, AlertTriangle } from 'lucide-react';
import { useManagerRead } from '../web3/hooks/useManagerRead';
import { policyType } from './PolicyCard';
import Link from 'next/link';

// Mock data for a policy
const mockPolicy = {
  id: 'POL-123456',
  title: 'DeFi Protocol Coverage',
  description: 'Comprehensive coverage against smart contract vulnerabilities and hacks for decentralized finance protocols.',
  coverageAmount: 100000,
  premium: 5000,
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  policyHolder: '0x1234...5678',
  riskLevel: 'High',
  claimsFiled: 2,
  status: 'Active'
};

const DetailItem = ({ icon, label, value }:any) => (
  <div className="flex items-center mb-4">
    {icon}
    <div className="ml-4">
      <p className="text-blue-300 text-sm">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  </div>
);
type policyReceived={
    data:policyType
}
export default function ViewDetail({policyId}:{policyId:number}) {
    const {data:policy} = useManagerRead({
        functionName:"getPolicyDetails",
        args:[policyId]
    }) as {data:policyType}
    if(policy==undefined){
        return(<> </>)
    }
    return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-blue-700">
      <Head>
        <title>Policy Details - Insurance Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-24">
        <div className='absolute top-30 left-10'>
            <Link href="/dashboard">
                <span className=' text-gray-300 hover:underline'>{"<-"} Back</span>
            </Link>
        </div>
        <div className="max-w-4xl mx-auto bg-black bg-opacity-40 backdrop-blur-md rounded-lg overflow-hidden shadow-2xl">
          <div className="p-8 bg-blue-900 bg-opacity-50">
            <h1 className="text-4xl font-bold text-white mb-2">{policy.title}</h1>
            <p className="text-blue-200">Policy ID: {`${policy.id}`}</p>
          </div>
          
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Policy Description</h2>
              <p className="text-gray-300">{policy.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <DetailItem 
                  icon={<DollarSign className="text-green-400 h-6 w-6" />}
                  label="Coverage Amount"
                  value={`${Number(BigInt(policy.coverageAmount))/10**18} XFI`}
                />
                <DetailItem 
                  icon={<DollarSign className="text-yellow-400 h-6 w-6" />}
                  label="Premium"
                  value={`${(Number(BigInt(policy.premium))/10**18).toFixed(4)} XFI`}
                />
                <DetailItem 
                  icon={<Calendar className="text-blue-400 h-6 w-6" />}
                  label="Policy expiration date"
                  value={` ${new Date(Number(BigInt(policy.expirationDate))*1000  ).toLocaleDateString()}`}
                />
                <DetailItem 
                  icon={<User className="text-purple-400 h-6 w-6" />}
                  label="Policy Creator"
                  value={`${policy.owner.substring(0,15)+"......"}`}
                />
              </div>
              <div>
                
                <DetailItem 
                  icon={<Shield className="text-green-400 h-6 w-6" />}
                  label="Status"
                  value={policy.isActive?"Active":"Not Active"}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}