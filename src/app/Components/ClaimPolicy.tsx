"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { FileText, Key, Upload } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PinataSDK } from "pinata-web3";
import { useManagerWrite } from "../web3/hooks/useManagerWrite";
import toast from "react-hot-toast";

const FormField = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  icon,
}: any) => (
  <div>
    <label htmlFor={id} className="block text-blue-300 mb-2 font-semibold">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-gray-800 text-white rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        {icon}
      </div>
    </div>
  </div>
);

export default function ClaimPolicy() {
  const [formData, setFormData] = useState({
    policyId: "",
    description: "",
    document: null,
  });
  const [ipfshash, setIpfsHash] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {write:claimPolicy,isSuccess} = useManagerWrite();

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (ipfsHash:string) => {
    console.log("Submitting claim with data:", formData);
    console.log("IPFShash: ",ipfshash);
    // Here you would typically send the data to your backend or smart contract
    claimPolicy({
      functionName:"claimPolicy",
      args:[formData.policyId,ipfsHash,formData.description]
    })
    
    setIsSubmitted(true);      

  };

  const handleIPFSUpload = async (e: any) => {
    console.log("Uploading to IPFS...")
    const pinata = new PinataSDK({
      pinataJwt:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiMTY3MDQ4Yi1kNWJhLTRjNGYtOTY0NS03NWE4ZmQ1NWQ3YmQiLCJlbWFpbCI6InNha3NoYW1iaHVncmE4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI0NWRmMzQ4ZTMzNjk5ZmEzZjM5NSIsInNjb3BlZEtleVNlY3JldCI6IjYzZjk5NWUyYzM3NjE3NmI3Y2JkOWM5NzVhMmFlNzAxYWFiOTBlZTY1MzE5MDkwMjdiNzVkNzZiMDc5MzNjYTMiLCJleHAiOjE3NTg5NTQ0MDF9.rxNO6L5RoS_615dhsNmH5Fxdz-QmiZ0fTapMxsFxd50",
      pinataGateway: "olive-fashionable-mule-815.mypinata.cloud",
    });

    const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
    try {
      const upload = await pinata.upload.file(
        formData.document ? formData.document : file
      );
      if (upload) {
        const ipfsURL =  `https://olive-fashionable-mule-815.mypinata.cloud/ipfs/` + upload.IpfsHash
        setIpfsHash(ipfsURL);
        console.log("Uploaded with URL: " +ipfsURL);
        handleSubmit(ipfsURL);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    if(isSubmitted){
      toast.success("Claim submitted successfully")
    }
  },[isSubmitted])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-blue-700">
      <Head>
        <title>Claim Policy - Insurance Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto bg-black bg-opacity-70 rounded-lg overflow-hidden shadow-2xl">
          <div className="p-8 bg-blue-900 bg-opacity-50">
            <h1 className="text-4xl font-bold text-white mb-2">Claim Policy</h1>
            <p className="text-blue-200">Submit your insurance claim</p>
          </div>

          <div className="p-8 space-y-6">
            <FormField
              label="Policy ID"
              id="policyId"
              name="policyId"
              value={formData.policyId}
              onChange={handleChange}
              icon={<Key className="text-blue-400" size={20} />}
            />

            <div>
              <label
                htmlFor="description"
                className="block text-blue-300 mb-2 font-semibold"
              >
                Claim Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="documents"
                className="block text-blue-300 mb-2 font-semibold"
              >
                Supporting Documents
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="documents"
                  name="document"
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 text-white rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <Upload
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                  size={20}
                />
              </div>
            </div>
              <button
                onClick={handleIPFSUpload}
                className="w-full mt-8 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Claim Policy
              </button>
            
          </div>
        </div>
      </main>
    </div>
  );
}
