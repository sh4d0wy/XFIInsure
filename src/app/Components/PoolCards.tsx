import React from 'react'

export function PoolInfoCard({ title, value }:{title:string,value:string}) {
    return (
      <div className="bg-black bg-opacity-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-300 mb-2">{title}</h2>
        <p className="text-3xl text-white">{value}</p>
      </div>
    )
  }