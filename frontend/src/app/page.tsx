'use client'

import { useEffect } from 'react'

import { useInkathon } from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'

import Grimcutty from '@/components/grimcutty/App'
import { ChainInfo } from '@/components/web3/chain-info'
import { ConnectButton } from '@/components/web3/connect-button'
import { GreeterContractInteractions } from '@/components/web3/greeter-contract-interactions'

export default function HomePage() {
  // Display `useInkathon` error messages (optional)
  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      <div className="container relative flex grow flex-col items-center justify-center py-10">
        {/* Title */}
        {/* <HomePageTitle /> */}
        <Grimcutty />
        {/* Connect Wallet Button */}
        <ConnectButton />

        <div className="mt-12 flex w-full flex-wrap items-start justify-center gap-4">
          {/* Chain Metadata Information */}
          <ChainInfo />

          {/* Greeter Read/Write Contract Interactions */}
          <GreeterContractInteractions />
        </div>
        {/* Footer */}
        <footer className="footer">
          <p>
            Grimcutty Coin is a community-driven project aimed at promoting mental health awareness.
            Always do your own research before investing.
          </p>
          <p>© 2024 Grimcutty Coin. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
