// pages/dashboard.js
import Head from 'next/head'
import Navbar from '../Components/Navbar'
import PolicyCard from '../Components/PolicyCard'
import { policyType } from '../Components/PolicyCard';
import {useManagerRead} from "../web3/hooks/useManagerRead";
import GetPolicies from '../Components/GetPolicies';
const page = ()=>{
  // Mock data for policies (replace with actual data fetching logic)
  const policies = [
    {
      id: 1,
      name: "Basic Health Insurance",
      coverage: "$100,000",
      premium: "$50/month",
      provider: "HealthGuard Inc.",
      type: "Health",
      duration: "1 Year",
    },
    {
      id: 2,
      name: "Comprehensive Auto Insurance",
      coverage: "$500,000",
      premium: "$100/month",
      provider: "AutoShield Co.",
      type: "Auto",
      duration: "6 Months",
    },
    {
      id: 3,
      name: "Home Owner's Insurance",
      coverage: "$1,000,000",
      premium: "$150/month",
      provider: "HomeSafe LLC",
      type: "Property",
      duration: "1 Year",
    },
  ]
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-blue-700 px-16 ">
      <main className="container mx-auto px-4 py-32">
        <h1 className="text-4xl font-bold text-white mb-8">All Policies</h1>
        <GetPolicies/>
      </main>
    </div>
  )
}
export default page;
