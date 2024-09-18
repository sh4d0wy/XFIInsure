// components/PolicyCard.js
export type policyType={
  owner:string,
  title:string,
  coverageAmount:number,
  premium:number,
  expirationDate:number,
  isActive:boolean,
  coverageType:string
}
export default function PolicyCard({policy}:{policy:policyType}) {
  console.log(policy.expirationDate);
    return (
      <div className="bg-black bg-opacity-50 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">{policy.title}</h2>
        <div className="space-y-2 mb-6">
          <p><span className="text-blue-300">Coverage:</span> {Number(BigInt(policy.coverageAmount))/10**18}</p>
          <p><span className="text-blue-300">Premium:</span> {Number(BigInt(policy.premium))/10**18}</p>
          <p><span className="text-blue-300">Provider:</span> {policy.owner.slice(0,10)}...</p>
          <p><span className="text-blue-300">Type:</span> {policy.coverageType}</p>
          <p><span className="text-blue-300">Duration:</span> {new Date(Number(BigInt(policy.expirationDate))*1000  ).toLocaleString()}</p>
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