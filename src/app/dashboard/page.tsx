// pages/dashboard.js
import Head from 'next/head'
import Navbar from '../Components/Navbar'
import PolicyCard from '../Components/PolicyCard'
import { policyType } from '../Components/PolicyCard';
import {useManagerRead} from "../web3/hooks/useManagerRead";
import GetPolicies from '../Components/GetPolicies';
const page = ()=>{
  
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
