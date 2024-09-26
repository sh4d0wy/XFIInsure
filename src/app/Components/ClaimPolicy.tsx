"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import { FileText, Key, Upload } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';



const FormField = ({ label, id, name, type = "text", value, onChange, icon }:any) => (
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
    policyId: '',
    description: '',
    documents: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e:any) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Submitting claim with data:', formData);
    // Here you would typically send the data to your backend or smart contract
    setIsSubmitted(true);
  };

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
          
         (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <FormField
                label="Policy ID"
                id="policyId"
                name="policyId"
                value={formData.policyId}
                onChange={handleChange}
                icon={<Key className="text-blue-400" size={20} />}
              />

              <div>
                <label htmlFor="description" className="block text-blue-300 mb-2 font-semibold">
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
                <label htmlFor="documents" className="block text-blue-300 mb-2 font-semibold">
                  Supporting Documents
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="documents"
                    name="documents"
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800 text-white rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full mt-8 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Submit Claim
              </button>
            </form>
          )
        </div>
      </main>
    </div>
  );
}