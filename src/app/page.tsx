// pages/index.js
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-blue-700 flex flex-col">
      <Head>
        <title>Insurance Protocol - Secure Your Future</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col justify-center mt-32">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            XFIInsure
          </h1>
          <p className="text-2xl text-blue-200 mb-8">
            Secure Your Future with Blockchain Technology
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
          <FeatureCard
            title="Decentralized"
            description="Leverage the power of blockchain for transparent and secure insurance policies."
          />
          <FeatureCard
            title="Smart Contracts"
            description="Automate claims processing and payouts with tamper-proof smart contracts."
          />
          <FeatureCard
            title="Low Premiums"
            description="Enjoy competitive rates thanks to our efficient, blockchain-based system."
          />
        </div>
      </main>

      <footer className="text-center py-8 text-blue-200">
        <p>&copy; 2024 Insurance Protocol. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }:{title:string,description:string}) {
  return (
    <div className="bg-black bg-opacity-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-blue-300 mb-4">{title}</h2>
      <p className="text-blue-100">{description}</p>
    </div>
  )
}