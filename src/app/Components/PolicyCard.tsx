// components/PolicyCard.js
export type policyType={
    id:number,
    name:string,
    coverage:string,
    premium:string,
    provider:string,
    type:string,
    duration:string
}
export default function PolicyCard({policy}:{policy:policyType}) {
    return (
      <div className="bg-black bg-opacity-50 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">{policy.name}</h2>
        <div className="space-y-2 mb-6">
          <p><span className="text-blue-300">Coverage:</span> {policy.coverage}</p>
          <p><span className="text-blue-300">Premium:</span> {policy.premium}</p>
          <p><span className="text-blue-300">Provider:</span> {policy.provider}</p>
          <p><span className="text-blue-300">Type:</span> {policy.type}</p>
          <p><span className="text-blue-300">Duration:</span> {policy.duration}</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
            View Details
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
            Subscribe
          </button>
        </div>
      </div>
    )
  }