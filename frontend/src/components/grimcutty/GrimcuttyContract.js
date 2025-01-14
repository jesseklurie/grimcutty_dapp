'use client'

import React, { useEffect, useState } from 'react'

import { ApiPromise, WsProvider } from '@polkadot/api'
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp'

const GrimcuttyContract = () => {
  const [api, setApi] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [status, setStatus] = useState('')

  // Initialize the API and accounts
  useEffect(() => {
    const init = async () => {
      const provider = new WsProvider('wss://polkadot-asset-hub-rpc.polkadot.io')
      const api = await ApiPromise.create({ provider: provider })
      setApi(api)

      const extensions = await web3Enable('Grimcutty DApp')
      if (extensions.length === 0) {
        setStatus('No wallet extension found. Please install a Substrate wallet.')
        return
      }

      const injectedAccounts = await web3Accounts()
      setAccounts(injectedAccounts)
      setSelectedAccount(injectedAccounts[0]?.address || null)
    }

    init()
  }, [])

  const handleExtrinsic = async (extrinsicName, params = []) => {
    if (!api || !selectedAccount) {
      setStatus('API or account not initialized.')
      return
    }

    try {
      const injector = await web3Enable('Grimcutty DApp')
      const { signer } = injector.find((ext) =>
        ext.accounts.some((acc) => acc.address === selectedAccount),
      )

      const extrinsic = api.tx.contracts.call(
        'your-contract-address', // Replace with your contract address
        0, // Value to transfer (0 for most calls unless transferring funds)
        5000000000, // Gas limit (adjust as needed)
        api.tx.contracts.call.encodeCallData(
          api.tx.contracts.call.abi.messages[extrinsicName].selector, // Replace with the extrinsic selector
          ...params,
        ),
      )

      extrinsic.signAndSend(selectedAccount, { signer }, ({ status }) => {
        if (status.isInBlock) {
          setStatus(`Transaction included in block: ${status.asInBlock}`)
        } else if (status.isFinalized) {
          setStatus(`Transaction finalized at block: ${status.asFinalized}`)
        }
      })
    } catch (error) {
      console.error(error)
      setStatus('Transaction failed. See console for details.')
    }
  }

  return (
    <div>
      <h1>Grimcutty NFT Interaction</h1>

      <div>
        <label htmlFor="account">Select Account:</label>
        <select
          id="account"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          {accounts.map((account) => (
            <option key={account.address} value={account.address}>
              {account.meta.name || account.address}
            </option>
          ))}
        </select>
      </div>

      <button onClick={() => handleExtrinsic('purchase_grimcutty', [])}>Purchase Grimcutty</button>
      <button
        onClick={() => handleExtrinsic('burn_grimcutty_for_polkadot', [10])} // Example: Burn 10 tokens
      >
        Burn Grimcutty for Polkadot
      </button>
      <button onClick={() => handleExtrinsic('trade_grimcutty', [])}>Trade Grimcutty</button>

      <div>Status: {status}</div>
    </div>
  )
}

export default GrimcuttyContract
